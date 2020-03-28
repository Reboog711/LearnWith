import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpUtils} from "./http-utils";
import {Observable} from "rxjs";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {UserVO} from "../../vo/user-vo";
import {TaskVO} from "../../vo/task-vo";
import {isNumeric} from "rxjs/internal-compatibility";
const servicePrefix : string = '/nodejs/';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class TaskServiceNodeJS {

  constructor(private http: HttpClient) {
  }

  loadTasks(taskFilter : TaskFilterVO) : Observable<any> {
    let parameters : string =  "filter" + '=' + HttpUtils.objToJSONString(taskFilter) + '&';
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

  scheduleTask(task :TaskVO): Observable<any> {
    let parameters = "taskID" + "=" + task.taskID + '&';
    if (task.dateScheduled) {
      parameters +=   "dateScheduled" + "=" + task.dateScheduled;
    }
    let url = servicePrefix + 'taskService/scheduleTask?' + parameters;
    return this.http.get(url);
  };

  scheduleTaskList(tasks :TaskVO[], schedulerDate:Date): Observable<any> {
    let datePipe : DatePipe = new DatePipe('en-US');
    let taskIDList = '';
    for (let index = 0; index < tasks .length; ++index) {
      taskIDList += tasks [index].taskID + ",";
    }
    taskIDList = taskIDList.substr(0,taskIDList.length - 1);
    let parameters = "taskIDList" + "=" + taskIDList + '&';
    parameters += "dateScheduled" + "=" +
      datePipe.transform(schedulerDate, 'shortDate') + '&';
    let url = servicePrefix + 'taskService/scheduleTaskList?' + parameters;
    return this.http.get(url);
  };

  completeTask(task:TaskVO) : Observable<any> {
    let parameters = "taskID" + "=" + task.taskID + '&';
    parameters += "completed" + "=" + !task.completed;
    let url = servicePrefix + 'taskService/completeTask?' + parameters;
    return this.http.get(url);
  };

}
