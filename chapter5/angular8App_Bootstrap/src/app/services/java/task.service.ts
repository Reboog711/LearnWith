import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {DatePipe} from "@angular/common";
import {UserVO} from "../../vo/user-vo";
import {TaskVO} from "../../vo/task-vo";
import {isNumeric} from "rxjs/internal-compatibility";

const servicePrefix : string = '/java/webapi/';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceJava {

  options : object;

  constructor(private http: HttpClient) {
    let optionHeaders : HttpHeaders = new HttpHeaders().set('Content-Type',
      'application/json');
    this.options = {headers:optionHeaders};
  }

  loadTasks(taskFilter:TaskFilterVO) : Observable<any> {
    let datePipe: DatePipe = new DatePipe('en-US');
    let url : string = servicePrefix + 'tasks';
    let concatenator : string = "?";
    if ((taskFilter.completed !== null) &&
      (typeof taskFilter.completed !== "undefined")) {
      url += concatenator + "completed=" + taskFilter.completed;
      concatenator = "&";
    }
    if (taskFilter.startDate) {
      url += concatenator + "startDate=" +
        datePipe.transform(taskFilter.startDate, "yyyy-MM-dd");
      concatenator = "&";
    }
    if (taskFilter.endDate) {
      url += concatenator + "endDate=" +
        datePipe.transform(taskFilter.endDate, "yyyy-MM-dd");
      concatenator = "&";
    }
    if (taskFilter.scheduledEndDate) {
      url += concatenator + "scheduledEndDate=" +
        datePipe.transform(taskFilter.scheduledEndDate, "yyyy-MM-dd");
      concatenator = "&";
    }
    if (taskFilter.scheduledStartDate) {
      url += concatenator + "scheduledStartDate=" +
        datePipe.transform(taskFilter.scheduledStartDate, "yyyy-MM-dd");
      concatenator = "&";
    }
    if (taskFilter.taskCategoryID) {
      url += concatenator + "taskCategoryID=" + taskFilter.taskCategoryID;
      concatenator = "&";
    }
    return this.http.get(url);
  }

  loadTaskCategories(taskFilter:TaskFilterVO) : Observable<any> {
    let url : string = servicePrefix + 'taskCategories';
    return this.http.get(url);
  }

  updateTask(task :TaskVO, user :UserVO): Observable<any> {
    if(!isNumeric(task.taskCategoryID)){
      task.taskCategoryID = 0;
    }
    if (task.taskID) {
      return this.updateTask_internal(task);
    } else {
      return this.createTask_internal(task, user);
    }
  };

  private createTask_internal(task :TaskVO, user :UserVO): Observable<any> {
    let parameters = {
      taskCategoryID: task.taskCategoryID,
      description: task.description,
      userID : user.userID
    };
    return this.http.post(servicePrefix + 'task',
      parameters,
      this.options);
  }

  private updateTask_internal(task :TaskVO): Observable<any> {
    let parameters = {
      taskID: task.taskID,
      taskCategoryID: task.taskCategoryID,
      description: task.description
    };
    return this.http.put(servicePrefix + 'task',
      parameters,
      this.options);
  }


}
