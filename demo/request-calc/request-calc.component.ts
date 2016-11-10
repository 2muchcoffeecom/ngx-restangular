import {Component} from "@angular/core";
import {Restangular} from "./../../src";

import 'rxjs/Rx';
import {RequestShowService} from "../request-show-service/request-show.service";
import {Observable, BehaviorSubject} from "rxjs";


@Component({
  selector: 'request-calc',
  //styleUrls: ['./request-calc/request-calc.style.css'],
  template: `
    <div class=clearfix>
    <div class="col">
        <h3>Simple Example of <select name="type" [(ngModel)]="selectType" (change)="changeSelectedType($event)">
            <option value="one" selected>one</option>
            <option value="all">all</option>
        </select>
            <select name="method" [(ngModel)]="selectMethod">
                <option *ngFor="let method of methods" value="{{method.name}}" [hidden]="method.disabled">
                    {{method.name}}
                </option>
            </select> Request
        </h3>
        <form #form="ngForm" (submit)="sendRequest(form)">

            <label for="endpoint">http://api.2muchcoffee.com/v1/</label>
            <div class=label-top><label>endpoint</label><input name="endpoint" type=text id="endpoint" #endpoint
                                                               [(ngModel)]="request.endpoint" required></div>
            <label for="id" [hidden]="selectType=='all'">/</label>
            <div class=label-top [hidden]="selectType=='all'"><label>id</label><input type=text name="id" id="id"
                                                                                      [(ngModel)]="request.id"></div>


            <label for="id" *ngIf="selectType=='all'&&selectMethod=='get'">/</label>
            <div class=label-top *ngIf="selectType=='all'&&selectMethod=='get'"><label>id</label><input type=text #idget
                                                                                                        required
                                                                                                        name="idget"
                                                                                                        id="idget"
                                                                                                        [(ngModel)]="request.id">
            </div>

            <label for="subelement"
                   [hidden]="selectType=='one'&&(selectMethod=='getList'||selectMethod=='post')?false:true">/</label>
            <div class=label-top
                 [hidden]="selectType=='one'&&(selectMethod=='getList'||selectMethod=='post')?false:true"><label>Sub
                Element</label><input name="subelement" id="subelement" [(ngModel)]="request.subelement"></div>


            <div class=clearfix [hidden]="selectMethod=='post'?false:true">
                <div class=col2>
                    <label for="elementToPostName">Element To Post Name</label>
                    <input name="elementToPostName" id="elementToPostName" type=text [(ngModel)]="elementToPost.name">
                </div>
                <div class=col2>
                    <label for="elementToPostValue">Element To Post Value</label>
                    <input name="elementToPostValue" id="elementToPostValue" type=text
                           [(ngModel)]="elementToPost.value">
                </div>
            </div>
        </form>
        <div>
            <div *ngFor="let query of queryArr; let index=index" class=clearfix>
                <div class=col2>
                    <label for="queryParamName">Parameter Name</label>
                    <input name="queryParamName" id="queryParamName" [(ngModel)]="query.name" type=text
                           (change)="makeRequest(form)">
                </div>
                <div class=col2>
                    <label for="queryParamValue">Parameter Value</label>
                    <input name="queryParamValue" id="queryParamValue" [(ngModel)]="query.value" type=text
                           (change)="makeRequest(form)">
                </div>
            </div>
            <input type=button class=button (click)="addQueryParams(); $event.preventDefault()"
                   value="Add Query Params">
        </div>
        <div>
            <div *ngFor="let header of headersArr; let index=index" class=clearfix>
                <div class=col2>
                    <label for="headerName">Header Name</label>
                    <input name="headerName" id="headerName" [(ngModel)]="header.name" type=text
                           (change)="makeRequest(form)">
                </div>
                <div class=col2>
                    <label for="headerValue">Header Value</label>
                    <input name="headerValue" id="headerValue" [(ngModel)]="header.value" type=text
                           (change)="makeRequest(form)">
                </div>
            </div>
            <input type=button class=button (click)="addHeaders(); $event.preventDefault()" value="Add Headers">
        </div>
        <div>
            <button (click)="Submit(form, endpoint)" class="button large">Send Request</button>
        </div>

        <h3>Sample of function</h3>
        <pre rel="javascript" [hidden]="selectType=='all'"><code>
restangular.{{selectType}}({{request.endpoint}},{{request.id}}).{{selectMethod}}(<span
                [hidden]="selectMethod!='getList' && selectMethod!='post'">{{request.subelement}},</span><span
                [hidden]="selectMethod!='post'">{{elementToPost.name?"{\"" + (elementToPost.name || "") + "\":\"" + (elementToPost.value || "") + "\"}":"{}"}},</span>{{request.queryParams| json}},{{request.headers | json}})</code>
        </pre>
        <pre rel="javascript" [hidden]="selectType=='one'"><code>
restangular.{{selectType}}({{request.endpoint}}).{{selectMethod}}(<span [hidden]="selectMethod!='post'">{{elementToPost | json}},</span>{{request.queryParams| json}},{{request.headers | json}})</code>
    </pre>
    </div>

    <div class="col">
        <h3>Request</h3>
        <pre rel="javascript"><code>{{requestToShow$ | async | json}}</code></pre>
    </div>
    <div class="col">
        <h3>Response</h3>
        <pre rel="javascript"><code>{{responseToShow$ | async | json}}</code></pre>
    </div>
</div>
`,
})
export class RequestCalcComponent {
  public allAccounts: any;
  public oneAccountsBuildings: any;
  public account: any;
  public form: any;
  public selectType: any = "one";
  public selectMethod: any = "get";

  public elementToPost: any = {};
  public SubElement:any;

  public queryArr = [];
  public headersArr = [];

  public types = ["one", "all"];
  public methods = [
    {name: "get", disabled: false}, {name: "post", disabled: false},
    {name: "put", disabled: false}, {name: "remove", disabled: false},
    {name: "head", disabled: false},{name: "trace", disabled: false},
    {name: "options", disabled: false},{name: "getList", disabled: false},
    {name: "putElement", disabled: true}];

  public request = {
    endpoint: "",
    id: "",
    headers: {},
    queryParams: {},
    subelement: ""
  };

  public requestToShow$: any;
  public responseToShow$: any = new BehaviorSubject(null);


  constructor(public restangular: Restangular, private requestShowService: RequestShowService) {
  }

  ngAfterViewInit() {
    // this.requestToShow$ = this.requestShowService.requestToShow;
  }

  Submit(form,e) {

    if(form.invalid)return false;

    this.sendRequest(form)
  }

  private formParams(param) {
    let params = {};
    param.filter(r=>!!r.name).map(param => {
      params[param.name] = param.value;
    });
    return params;
  }

  makeRequest(form) {
    form.value.queryParams = this.formParams(this.queryArr);
    form.value.headers = this.formParams(this.headersArr);
    this.request.queryParams = form.value.queryParams;
    this.request.headers = form.value.headers;
  }

  sendRequest(form) {
    let elementToPost = {};
    this.makeRequest(form);
    if(this.selectMethod == "post") {
      elementToPost["" + this.elementToPost.name] = this.elementToPost.value;
    }
    if (this.selectType == "all") {
      if (this.selectMethod == "post") {
        this.restangular[this.selectType](form.value.endpoint)[this.selectMethod](elementToPost, form.value.queryParams, form.value.headers).subscribe(res => {
          this.responseToShow$.next(res);
        }).unsubscribe();
      }
      else if (this.selectMethod == "get") {
        this.restangular[this.selectType](form.value.endpoint)[this.selectMethod](form.value.id, form.value.queryParams, form.value.headers).subscribe(res => {
          this.responseToShow$.next(res);
        }).unsubscribe();
      }
      else {
        this.restangular[this.selectType](form.value.endpoint)[this.selectMethod](form.value.queryParams, form.value.headers).subscribe(res => {
          this.responseToShow$.next(res);
        }).unsubscribe();
      }
    }
    else {
      if (this.selectMethod == "post") {
        this.restangular[this.selectType](form.value.endpoint,form.value.id)[this.selectMethod](form.value.subelement, elementToPost, form.value.queryParams, form.value.headers).subscribe(res => {
          this.responseToShow$.next(res);
        }).unsubscribe();
      }
      else if (this.selectMethod == "getList") {
        this.restangular[this.selectType](form.value.endpoint,form.value.id)[this.selectMethod](form.value.subelement, form.value.queryParams, form.value.headers).subscribe(res => {
          this.responseToShow$.next(res);
        }).unsubscribe();
      }
      else {
        this.restangular[this.selectType](form.value.endpoint,form.value.id)[this.selectMethod](form.value.queryParams, form.value.headers).subscribe(res => {
          this.responseToShow$.next(res);
        }).unsubscribe();
      }
    }
    form.reset();
  }

  addQueryParams() {
    this.queryArr.push({});
  }

  addHeaders() {
    this.headersArr.push({});
  }

  changeSelectedType(ev) {

    if (ev.target.value == "all") {
      this.methods.map(method => {
        method.name == "put" ? method.disabled = true : method.disabled = false;
        return method;
      });
    }
    else {
      this.methods.map(method => {
        method.name == "putElement" ? method.disabled = true : method.disabled = false;
        return method;
      });
    }
  }


  ngOnInit() {

    this.responseToShow$.subscribe(res => {
    });

    this.requestToShow$ = this.requestShowService.requestToShow;



    // let formData = new FormData();
    //   formData.append("name", "test");
    //
    // this.restangular.all('users')
    // .customPOST(formData, undefined, undefined, { 'Content-Type': undefined });

    //   // First way of creating a this.restangular object. Just saying the base URL
    //   let baseAccounts = this.restangular.all('accounts');
    //
    //   // This will query /accounts and return a observable.
    //   baseAccounts.getList().subscribe(accounts => {
    //     this.allAccounts = accounts.map(account => {return{"account": account.user}});
    //     console.log(accounts);
    //   });
    //
    //
    //
    //   let newAccount = {name: "Gonto's account"};
    //
    //   // POST /accounts
    //   baseAccounts.post(newAccount);
    //
    //   // GET to http://www.google.com/ You set the URL in this case
    //   this.restangular.allUrl('googlers', 'http://www.google.com/').getList();
    //
    //   // GET to http://www.google.com/1 You set the URL in this case
    //   this.restangular.oneUrl('googlers', 'http://www.google.com/1').get();
    //
    //   // You can do RequestLess "connections" if you need as well
    //
    //   // Just ONE GET to /accounts/123/buildings/456
    //   this.restangular.one('accounts', 123).one('buildings', 456).get();
    //
    //   // Just ONE GET to /accounts/123/buildings
    //   this.restangular.one('accounts', 123).getList('buildings').subscribe(buildings => {
    //     this.oneAccountsBuildings = buildings.map(building => {return{"building": building.user}});
    //     console.log(buildings);
    //   });
    //
    //   // Here we use Observables
    //   // GET /accounts
    //   let baseAccounts$ = baseAccounts.getList();
    //     baseAccounts$.subscribe(accounts => {
    //     // Here we can continue fetching the tree :).
    //     console.log(accounts);
    //
    //     let firstAccount = accounts[0];
    //     // This will query /accounts/123/buildings considering 123 is the id of the firstAccount
    //     let buildings = firstAccount.getList("buildings");
    //
    //     // GET /accounts/123/places?query=param with request header: x-user:mgonto
    //     let loggedInPlaces = firstAccount.getList("places", {query: 'param'}, {'x-user': 'mgonto'});
    //
    //     // This is a regular JS object, we can change anything we want :)
    //     firstAccount.name = "Gonto";
    //
    //     // If we wanted to keep the original as it is, we can copy it to a new element
    //     let editFirstAccount = this.restangular.copy(firstAccount);
    //     editFirstAccount.name = "New Name";
    //
    //
    //     // PUT /accounts/123. The name of this account will be changed from now on
    //     firstAccount.put();
    //     editFirstAccount.put();
    //
    //     // PUT /accounts/123. Save will do POST or PUT accordingly
    //     firstAccount.save();
    //
    //     // DELETE /accounts/123 We don't have first account anymore :(
    //     firstAccount.remove();
    //
    //   }, () => {
    //     alert("Oops error from server :(");
    //   });
    //
    //
    //   // Get first account
    //   let firstAccount$ = baseAccounts$.map(accounts => accounts[0]);
    //
    //   // POST /accounts/123/buildings with MyBuilding information
    //   firstAccount$.switchMap(firstAccount => {
    //     let myBuilding = {
    //       name: "Gonto's Building",
    //       place: "Argentina"
    //     };
    //
    //     return firstAccount.post("Buildings", myBuilding)
    //   })
    //     .subscribe(() => {
    //       console.log("Object saved OK");
    //     }, () => {
    //       console.log("There was an error saving");
    //     });
    //
    //
    //   // GET /accounts/123/users?query=params
    //   firstAccount$.switchMap(firstAccount => {
    //     let myBuilding = {
    //       name: "Gonto's Building",
    //       place: "Argentina"
    //     };
    //
    //     return firstAccount.getList("users", {query: 'params'});
    //   })
    //     .subscribe((users) => {
    //       // Instead of posting nested element, a collection can post to itself
    //       // POST /accounts/123/users
    //       users.post({userName: 'unknown'});
    //
    //       // Custom methods are available now :).
    //       // GET /accounts/123/users/messages?param=myParam
    //       users.customGET("messages", {param: "myParam"});
    //
    //       let firstUser = users[0];
    //
    //       // GET /accounts/123/users/456. Just in case we want to update one user :)
    //       let userFromServer = firstUser.get();
    //
    //       // ALL http methods are available :)
    //       // HEAD /accounts/123/users/456
    //       firstUser.head()
    //     }, () => {
    //       console.log("There was an error saving");
    //     });
    //
    //
    //   // Second way of creating this.restangular object. URL and ID :)
    //   this.account = this.restangular.one("accounts", 123);
    //
    //   // GET /accounts/123?single=true
    //   this.account.get({single: true});
    //
    //   // POST /accounts/123/messages?param=myParam with the body of name: "My Message"
    //   this.account.customPOST({name: "My Message"}, "messages", {param: "myParam"}, {})
    //
  }

}
