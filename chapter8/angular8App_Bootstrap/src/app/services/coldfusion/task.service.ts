import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {HttpUtils} from "./http-utils";
import {UserVO} from "../../vo/user-vo";
import {TaskVO} from "../../vo/task-vo";
import {isNumeric} from "rxjs/internal-compatibility";
import {DatePipe} from "@angular/common";
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

  loadTaskCategories(): Observable<any> {
    let parameters = {
      method : "getTaskCategories"
    };
    return this.http.post(servicePrefix +
      'com/dotComIt/learnWith/services/TaskService.cfc',
      HttpUtils.transformRequest(parameters),
      this.options);
  };

  updateTask(task :TaskVO, user :UserVO): Observable<any> {
    let method : string = "createTask";
    if(task.taskID){
      method = "updateTask";
    }
    if(!isNumeric(task.taskCategoryID)){
      task.taskCategoryID = 0;
    }

    let parameters = {
      method : method,
      taskCategoryID : task.taskCategoryID,
      description : task.description,
      taskID : task.taskID,
      userID : user.userID
    }

    return this.http.post(servicePrefix +
      'com/dotComIt/learnWith/services/TaskService.cfc',
      HttpUtils.transformRequest(parameters),
      this.options);
  };

  scheduleTask(task :TaskVO): Observable<any> {
    let parameters = {
      method : "scheduleTask",
      taskID : task.taskID
    };
    if (task.dateScheduled) {
      parameters['dateScheduled'] = task.dateScheduled;
    }
    return this.http.post(servicePrefix +
      'com/dotComIt/learnWith/services/TaskService.cfc',
      HttpUtils.transformRequest(parameters),
      this.options);
  };
  scheduleTaskList(tasks :TaskVO[], schedulerDate:Date): Observable<any> {
    let datePipe : DatePipe = new DatePipe('en-US');
    let taskIDList = '';
    for (let index = 0; index < tasks .length; ++index) {
      taskIDList += tasks [index].taskID + ",";
    }
    let parameters = {
      method : "scheduleTaskList",
      taskIDList : taskIDList,
      dateScheduled :  datePipe.transform(schedulerDate, 'shortDate')
    };

    return this.http.post(servicePrefix +
      'com/dotComIt/learnWith/services/TaskService.cfc',
      HttpUtils.transformRequest(parameters),
      this.options);
  };

  completeTask(task :TaskVO): Observable<any> {
    let parameters = {
      method : "completeTask",
      taskID  : task.taskID,
      completed  :  !task.completed
    };

    return this.http.post(servicePrefix +
      'com/dotComIt/learnWith/services/TaskService.cfc',
      HttpUtils.transformRequest(parameters),
      this.options);
  };


}
