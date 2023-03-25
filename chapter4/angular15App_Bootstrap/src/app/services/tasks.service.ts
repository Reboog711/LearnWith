import {Inject, Injectable} from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DOCUMENT} from "@angular/common";
import { TasksServiceMock } from './mock/tasks.service';
import {TaskVO} from "../vo/task-vo";
import {map, Observable} from "rxjs";
import {TaskFilterVO} from "../vo/task-filter-vo";


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
      url.searchParams.append('startDateAsUTCString',
        taskFilter.startDateAsUTCString);
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

    return this.http.get<TaskVO[]>(url.toString()).pipe(
      map( (results: TaskVO[]) => {
        return results.map((item: Object) => Object.assign(new TaskVO(), item));
      })
    );

  }


}
