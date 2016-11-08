import {Component} from "@angular/core";
import {Restangular} from "./../src";

import 'rxjs/Rx';


@Component({
  selector: 'demo-app',
  styles: [``],
  template: `
    <div class="text-center">
      DEMO
    </div>
    <h4>Get list of accounts from 'http://api.2muchcoffee.com/v1/accounts' allAccounts</h4>
    <ul>
        <li *ngFor="let acc of allAccounts">
            <p>User: {{acc}}</p>
        </li>
    </ul>
    <h4>Get list of buildings from 'http://api.2muchcoffee.com/v1/accounts/123/buildings' </h4>
    <ul>
        <li *ngFor="let building of oneAccountsBuildings">
            <p>Building: {{building}}</p>
        </li>
    </ul>
  `
})
export class Demo {
  public allAccounts: any;
  public oneAccountsBuildings: any;
  public account: any;


  constructor(public restangular: Restangular) {
  }

  ngOnInit() {
    // First way of creating a this.restangular object. Just saying the base URL
    let baseAccounts = this.restangular.all('accounts');

    // This will query /accounts and return a observable.
    baseAccounts.getList().subscribe(accounts => {
      this.allAccounts = accounts.map(account => account.user);
      console.log(accounts);
    });



    let newAccount = {name: "Gonto's account"};

    // POST /accounts
    baseAccounts.post(newAccount);

    // GET to http://www.google.com/ You set the URL in this case
    this.restangular.allUrl('googlers', 'http://www.google.com/').getList();

    // GET to http://www.google.com/1 You set the URL in this case
    this.restangular.oneUrl('googlers', 'http://www.google.com/1').get();

    // You can do RequestLess "connections" if you need as well

    // Just ONE GET to /accounts/123/buildings/456
    this.restangular.one('accounts', 123).one('buildings', 456).get();

    // Just ONE GET to /accounts/123/buildings
    this.restangular.one('accounts', 123).getList('buildings').subscribe(buildings => {
      this.oneAccountsBuildings = buildings.map(building => building.user);
      console.log(buildings);
    });

    // Here we use Observables
    // GET /accounts
    let baseAccounts$ = baseAccounts.getList();
      baseAccounts$.subscribe(accounts => {
      // Here we can continue fetching the tree :).
      console.log(accounts);

      let firstAccount = accounts[0];
      // This will query /accounts/123/buildings considering 123 is the id of the firstAccount
      let buildings = firstAccount.getList("buildings");

      // GET /accounts/123/places?query=param with request header: x-user:mgonto
      let loggedInPlaces = firstAccount.getList("places", {query: 'param'}, {'x-user': 'mgonto'});

      // This is a regular JS object, we can change anything we want :)
      firstAccount.name = "Gonto";

      // If we wanted to keep the original as it is, we can copy it to a new element
      let editFirstAccount = this.restangular.copy(firstAccount);
      editFirstAccount.name = "New Name";


      // PUT /accounts/123. The name of this account will be changed from now on
      firstAccount.put();
      editFirstAccount.put();

      // PUT /accounts/123. Save will do POST or PUT accordingly
      firstAccount.save();

      // DELETE /accounts/123 We don't have first account anymore :(
      firstAccount.remove();

    }, () => {
      alert("Oops error from server :(");
    });


    // Get first account
    let firstAccount$ = baseAccounts$.map(accounts => accounts[0]);

    // POST /accounts/123/buildings with MyBuilding information
    firstAccount$.switchMap(firstAccount => {
      let myBuilding = {
        name: "Gonto's Building",
        place: "Argentina"
      };

      return firstAccount.post("Buildings", myBuilding)
    })
      .subscribe(() => {
        console.log("Object saved OK");
      }, () => {
        console.log("There was an error saving");
      });


    // GET /accounts/123/users?query=params
    firstAccount$.switchMap(firstAccount => {
      let myBuilding = {
        name: "Gonto's Building",
        place: "Argentina"
      };

      return firstAccount.getList("users", {query: 'params'});
    })
      .subscribe((users) => {
        // Instead of posting nested element, a collection can post to itself
        // POST /accounts/123/users
        users.post({userName: 'unknown'});

        // Custom methods are available now :).
        // GET /accounts/123/users/messages?param=myParam
        users.customGET("messages", {param: "myParam"});

        let firstUser = users[0];

        // GET /accounts/123/users/456. Just in case we want to update one user :)
        let userFromServer = firstUser.get();

        // ALL http methods are available :)
        // HEAD /accounts/123/users/456
        firstUser.head()
      }, () => {
        console.log("There was an error saving");
      });


    // Second way of creating this.restangular object. URL and ID :)
    this.account = this.restangular.one("accounts", 123);

    // GET /accounts/123?single=true
    this.account.get({single: true});

    // POST /accounts/123/messages?param=myParam with the body of name: "My Message"
    this.account.customPOST({name: "My Message"}, "messages", {param: "myParam"}, {})

  }

}
