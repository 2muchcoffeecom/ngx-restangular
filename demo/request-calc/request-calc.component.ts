import {Component} from "@angular/core";
import {Restangular} from "./../../src";

import 'rxjs/Rx';
import {RequestShowService} from "../request-show-service/request-show.service";
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'request-calc',
  styleUrls: ['./request-calc/request-calc.style.css'],
  templateUrl: './request-calc/request-calc.template.html'
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
        },this.errorShow).unsubscribe();
      }
      else if (this.selectMethod == "get") {
        this.restangular[this.selectType](form.value.endpoint)[this.selectMethod](form.value.id, form.value.queryParams, form.value.headers).subscribe(res => {
          this.responseToShow$.next(res);
        },this.errorShow).unsubscribe();
      }
      else {
        this.restangular[this.selectType](form.value.endpoint)[this.selectMethod](form.value.queryParams, form.value.headers).subscribe(res => {
          this.responseToShow$.next(res);
        },this.errorShow).unsubscribe();
      }
    }
    else {
      if (this.selectMethod == "post") {
        this.restangular[this.selectType](form.value.endpoint,form.value.id)[this.selectMethod](form.value.subelement, elementToPost, form.value.queryParams, form.value.headers).subscribe(res => {
          this.responseToShow$.next(res);
        },this.errorShow).unsubscribe();
      }
      else if (this.selectMethod == "getList") {
        this.restangular[this.selectType](form.value.endpoint,form.value.id)[this.selectMethod](form.value.subelement, form.value.queryParams, form.value.headers).subscribe(res => {
          this.responseToShow$.next(res);
        },this.errorShow).unsubscribe();
      }
      else {
        this.restangular[this.selectType](form.value.endpoint,form.value.id)[this.selectMethod](form.value.queryParams, form.value.headers).subscribe(res => {
          this.responseToShow$.next(res);
        },this.errorShow).unsubscribe();
      }
    }
    form.reset();
  }

  errorShow(err) {
    console.log("Error from server with ErrorInterceptor",err);
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


  }

}
