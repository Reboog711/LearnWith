import {Inject, Injectable} from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DOCUMENT} from "@angular/common";
import {TaskVO} from "../vo/task-vo";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import { TaskFilterVO } from '../vo/task-filter-vo';
import { TasksServiceMock } from './mock/tasks.service';

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
      url.searchParams.append('startDateAsUTC', taskFilter.startDateAsUTCString);
    }
    return this.http.get<TaskVO[]>(url.toString()).pipe(
      map( (results: TaskVO[]) => {
        return results.map((item: Object) => Object.assign(new TaskVO(), item));
      })
    );


  }


}
