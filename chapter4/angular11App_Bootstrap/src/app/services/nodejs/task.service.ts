import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {HttpUtils} from "./http-utils";

const servicePrefix : string = '/nodejs/';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceNodeJS {

  constructor(private http: HttpClient) {
  }

  loadTasks(taskFilter : TaskFilterVO) : Observable<any> {
    let parameters : string =  "filter" + '=' +
      HttpUtils.objToJSONString(taskFilter) + '&';
    let url = servicePrefix + 'taskService/getFilteredTasks?' + parameters;
    return this.http.get(url);
  }

  loadTaskCategories() : Observable<any> {
    let url = servicePrefix + 'taskService/getTaskCategories';
    return this.http.get(url)
  }

}
