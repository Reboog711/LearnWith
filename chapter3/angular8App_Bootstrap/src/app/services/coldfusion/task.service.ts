import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {HttpUtils} from "./http-utils";

const servicePrefix : string = '/coldFusion/';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceCF {

  options : object;

  constructor(private http: HttpClient) {
    let optionHeaders : HttpHeaders = new HttpHeaders().set('Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8');
    this.options = {headers:optionHeaders};
  }

  loadTasks(taskFilter:TaskFilterVO) : Observable<any> {
    let parameters : Object = {
      method : "getFilteredTasks",
      filter : taskFilter
    };
    return this.http.post(servicePrefix +
      'com/dotComIt/learnWith/services/TaskService.cfc',
      HttpUtils.transformRequest(parameters),
      this.options)

  }

}
