import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class RequestShowService {
  public requestToShow: any = new BehaviorSubject(null);

}