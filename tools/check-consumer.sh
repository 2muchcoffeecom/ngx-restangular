#!/bin/bash
# Checks the packed library inside a fresh Angular app of one exact version.
#
#   npm run build
#   tools/check-consumer.sh 18.0.0
#   tools/check-consumer.sh 22.2.2 path/to/ngx-restangular-7.0.0.tgz
#
# It runs `ng new` (standalone, no SSR) with that Angular CLI version, pins every @angular package to
# the same version, copies tools/consumer-harness into the app, installs the tarball, then runs a
# production build and the harness tests (Karma in ChromeHeadless or Vitest, whichever `ng new` set up).
# Peer ranges are ignored on install on purpose: this is the check that decides them.
#
# Environment:
#   CONSUMER_WORKDIR  where the apps are created (default: $TMPDIR/ngx-restangular-consumers). It must be
#                     outside this repo: `ng new` refuses to run inside an Angular workspace.
#   NPM               npm command to use (default: npm). npm 10.9.2 crashes resolving vitest 4.1's
#                     peer set ("Cannot read properties of null (reading 'edgesOut')"); NPM="npx -y npm@11" works.
#
# Each Angular CLI checks the Node.js version first, so run it on a Node that version supports.
set -u

V=${1:?usage: tools/check-consumer.sh <angular-version> [tarball]}
REPO=$(cd "$(dirname "$0")/.." && pwd)
HARNESS=$REPO/tools/consumer-harness
WORK=${CONSUMER_WORKDIR:-${TMPDIR:-/tmp}/ngx-restangular-consumers}
NPM=${NPM:-npm}
mkdir -p "$WORK"

TGZ=${2:-}
if [ -z "$TGZ" ]; then
  [ -f "$REPO/dist/ngx-restangular/package.json" ] || { echo "dist/ngx-restangular is missing, run npm run build first"; exit 1; }
  TGZ=$WORK/$(cd "$REPO/dist/ngx-restangular" && npm pack --pack-destination "$WORK" --silent)
fi
TGZ=$(cd "$(dirname "$TGZ")" && pwd)/$(basename "$TGZ")

MAJOR=${V%%.*}
if [ "$MAJOR" -lt 17 ]; then FLAGS="--standalone"; else FLAGS="--ssr=false"; fi

DIR=$WORK/consumer-$V
rm -rf "$DIR"
cd "$WORK" || exit 1
NG_CLI_ANALYTICS=false npx -y -p "@angular/cli@$V" ng new "consumer-$V" --defaults --skip-git $FLAGS \
  --style=css --routing=false --skip-install > "$WORK/consumer-$V.log" 2>&1 || { echo "$V: ng new failed, see $WORK/consumer-$V.log"; exit 1; }
cd "$DIR" || exit 1

node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
for (const section of ['dependencies', 'devDependencies']) {
  for (const name of Object.keys(pkg[section] || {})) {
    if (name.startsWith('@angular/') || name === '@angular-devkit/build-angular') pkg[section][name] = '$V';
  }
}
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

rm -f src/app/app.component.* src/app/app.html src/app/app.css src/app/app.spec.ts src/app/app.ts src/app/app.config.ts
cp "$HARNESS/src/app/"* src/app/
cp -R "$HARNESS/public" .
sed -i.bak "s#import { AppComponent } from './app/app.component';#import { App } from './app/app';#; s#bootstrapApplication(AppComponent#bootstrapApplication(App#" src/main.ts && rm -f src/main.ts.bak

$NPM install --no-audit --no-fund --legacy-peer-deps >> "$WORK/consumer-$V.log" 2>&1 || { echo "$V: install failed, see $WORK/consumer-$V.log"; exit 1; }
$NPM install "$TGZ" --no-audit --no-fund --legacy-peer-deps >> "$WORK/consumer-$V.log" 2>&1 || { echo "$V: tarball install failed, see $WORK/consumer-$V.log"; exit 1; }
VERSIONS=$(node -e "console.log(['@angular/core', 'typescript', 'rxjs', 'ngx-restangular'].map(p => p + '@' + require(p + '/package.json').version).join(' '))")

BUILD=$(NG_CLI_ANALYTICS=false NO_COLOR=1 npx ng build 2>&1)
if echo "$BUILD" | grep -q "rror"; then
  echo "$V [$VERSIONS] BUILD FAILED"
  echo "$BUILD" | grep -B2 -A6 "rror" | head -30
  exit 1
fi
WARNINGS=$(echo "$BUILD" | grep -iE "warn|▲" | head -3)
MAIN=$(echo "$BUILD" | grep -E "main[-.]" | head -1 | tr -s ' ')

if grep -q '"karma"' package.json; then
  TESTS=$(NG_CLI_ANALYTICS=false NO_COLOR=1 npx ng test --watch=false --browsers=ChromeHeadless 2>&1 | grep -E "TOTAL|FAILED$|Error:" | tail -4)
else
  TESTS=$(NG_CLI_ANALYTICS=false NO_COLOR=1 npx ng test --watch=false 2>&1 | grep -E "Tests |×|Error" | tail -4)
fi
echo "$V [$VERSIONS] build ok: $MAIN | warnings: ${WARNINGS:-none} | tests: $TESTS"
