import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {HttpUtils} from "./HttpUtils";
import {TaskVO} from "../../vo/task-vo";
import {UserVO} from "../../vo/user-vo";
import {isNumeric} from "rxjs/internal-compatibility";


const servicePrefix : string = '/nodejs/';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

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

  updateTask(task :TaskVO, user :UserVO): Observable<any> {
    if(!isNumeric(task.taskCategoryID)) {
      task.taskCategoryID = 0;
    }
    let parameters = "taskCategoryID" + "=" + task.taskCategoryID + '&';
    parameters +=   "description" + "=" + task.description + '&';
    let method : string = "createTask";
    if (task.taskID) {
      method = "updateTask";
      parameters +=   "taskID" + "=" + task.taskID + '&';
    } else {
      parameters +=   "userID" + "=" + user.userID + '&';
    };
    let url = servicePrefix + 'taskService/' + method + '?' + parameters;

    return this.http.get(url);
  };

}
