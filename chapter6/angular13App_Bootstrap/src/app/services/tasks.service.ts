import {Inject, Injectable} from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DOCUMENT} from "@angular/common";
import {TaskVO} from "../vo/task-vo";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import { TaskFilterVO } from '../vo/task-filter-vo';
import { TasksServiceMock } from './mock/tasks.service';
import {ScheduleTaskBodyVO} from "../vo/schedule-task-body-vo";

const servicePrefix : string = `${environment.serverPrefix}`;

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: Document,
              private tasksServiceMock: TasksServiceMock) {
  }

  loadTasks(taskFilter:TaskFilterVO) : Observable<TaskVO[]> {
    if (environment.mockData) {
      return this.tasksServiceMock.loadTasks(taskFilter);
    }

    const url = new URL(`${servicePrefix}tasks`, this.document.location.origin)
    if ((taskFilter.completed !== null) &&
      (typeof taskFilter.completed !== "undefined")) {
      url.searchParams.append('completed', taskFilter.completed ?
        'true' : 'false');
    }
    if (taskFilter.startDateAsUTCString) {
      url.searchParams.append('startDateAsUTCString', taskFilter.startDateAsUTCString);
    }
    if (taskFilter.endDateAsUTCString) {
      url.searchParams.append('endDateAsUTCString',taskFilter.endDateAsUTCString);
    }
    if (taskFilter.scheduledStartDateAsUTCString) {
      url.searchParams.append('scheduledStartDateAsUTCString',
        taskFilter.scheduledStartDateAsUTCString)
    }
    if (taskFilter.scheduledEndDateAsUTCString) {
      url.searchParams.append('scheduledEndDateAsUTCString',
        taskFilter.scheduledEndDateAsUTCString)
    }
    if (taskFilter.taskCategoryID) {
      url.searchParams.append('taskCategoryID',
        taskFilter.taskCategoryID.toString())
    }
    if (taskFilter.scheduledEqualDateAsUTCString) {
      url.searchParams.append('scheduledEqualDateAsUTCString',
        taskFilter.scheduledEqualDateAsUTCString)
    }

    return this.http.get<TaskVO[]>(url.toString()).pipe(
      map( (results: TaskVO[]) => {
        return results.map((item: Object) => Object.assign(new TaskVO(), item));
      })
    );


  }

  scheduleTaskList(tasks :TaskVO[],
                   schedulerDateAsUTCString? : string): Observable<any> {
    if (environment.mockData) {
      return this.tasksServiceMock.scheduleTaskList(tasks, schedulerDateAsUTCString);
    }
    const url = `${servicePrefix}tasks/datescheduled`;
    let taskIDList = '';
    for (let index = 0; index < tasks .length; ++index) {
      taskIDList += tasks [index].taskID + ",";
    }
    taskIDList = taskIDList.slice(0, -1);
    let body: ScheduleTaskBodyVO = Object.assign(new ScheduleTaskBodyVO(), {
      taskIDList : taskIDList,
    })
    if (schedulerDateAsUTCString) {
      body.dateScheduledAsUTCString =  schedulerDateAsUTCString
    }
    return this.http.put(url, body);
  };


}
