import { HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { HeroService } from "../heroes-service/hero.service";
import { RequestShowService } from "../request-show-service/request-show.service";
import { Injectable } from "@angular/core";

@Injectable()
export class MockBackendService extends HttpHandler {

  constructor(private requestShowService: RequestShowService, private heroService: HeroService) {
    super();
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    let body: any = JSON.stringify([{user: "first"}, {user: "second"}, {user: "third"}]);
    let headers = new HttpHeaders({
      'header': 'server-header'
    });

    this.requestShowService.requestToShow.next(req);
    // console.log(connection.request);
    console.log("Request Url on Backend: ", req.urlWithParams);

    if (/(http:\/\/api.2muchcoffee.com\/v1\/heroes)/.test(req.urlWithParams)) {
      body = this.heroService.getHeroes();

      if(req.method == "POST") {
        this.heroService.addHero(JSON.stringify(req.body));
        body = this.heroService.getHeroes();
      }
      if(req.method == "DELETE" && req.headers.has("id")) {
        this.heroService.deleteHero(req.headers.get("id"));
        body = this.heroService.getHeroes();
      }
      if (req.method == "PUT" && req.headers.has("id")) {
        body = this.heroService.putHero(req.headers.get("id"), req.body);
      }
      if (/(http:\/\/api.2muchcoffee.com\/v1\/heroes\/)/.test(req.urlWithParams)) {
        let id = req.urlWithParams.slice(req.urlWithParams.lastIndexOf("/") + 1, req.urlWithParams.length);
        body = this.heroService.getHero(id);
      }
      if (/(http:\/\/api.2muchcoffee.com\/v1\/heroes\?number=)/.test(req.urlWithParams)) {
        let number = +req.urlWithParams.slice(req.urlWithParams.lastIndexOf("=") + 1, req.urlWithParams.length);
        body = this.heroService.getHeroes(number);
      }
    }

    if(/(https:\/\/randomuser.me\/api\/)/.test(req.urlWithParams)) {
      body = this.heroService.getHeroes().map((hero,index)=>{
        hero.name = "user" + ++index;
        return hero;
      });
    }

    if (/(http:\/\/api.2muchcoffee.com\/v1\/error)/.test(req.urlWithParams)) {
      return Observable.throw(new HttpErrorResponse({ headers, status: 403 }))
    }
    else {
      return Observable.of(new HttpResponse({ body, headers, status: 200})).delay(10);
    }
  }
}
