import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {TaskVO} from "../vo/task-vo";
import {map} from "rxjs/operators";
import {TaskServiceMock} from "./mock/task.service";
import {DOCUMENT} from "@angular/common";
const servicePrefix : string = `${environment.serverPrefix}`;

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: Document, private taskServiceMock: TaskServiceMock) { }

  loadTask(taskID: number) : Observable<TaskVO> {
    const url = `${servicePrefix}task/${taskID}`;
    return this.http.get<TaskVO>(url).pipe(
      map( (result: TaskVO) => {
        return Object.assign(new TaskVO(), result);
      })
    )
  }

  updateTask(task: TaskVO): Observable<TaskVO> {
    if (environment.mockData) {
      return this.taskServiceMock.updateTask(task);
    }
    if (task.taskID) {
      return this.updateTask_Internal(task);
    } else {
      return this.createTask_Internal(task);
    }
  }

  createTask_Internal(task: TaskVO): Observable<TaskVO> {

    if (!Number.isInteger(parseInt(String(task.taskCategoryID), 10))) {
      task.taskCategoryID = 0;
    }
    const url = `${servicePrefix}task`;
    return this.http.post<TaskVO>(url, task).pipe(
      map( (result: TaskVO) => {
        return Object.assign(new TaskVO(), result);
      })
    )
  }

  updateTask_Internal(task: TaskVO) : Observable<TaskVO> {
    if (!Number.isInteger(parseInt(String(task.taskCategoryID), 10))) {
      task.taskCategoryID = 0;
    }
    const url = `${servicePrefix}task/${task.taskID}`;
    return this.http.put<TaskVO>(url, task).pipe(
      map( (result: TaskVO) => {
        return Object.assign(new TaskVO(), result);
      })
    )
  }

  completeTask(task :TaskVO): Observable<TaskVO> {
    if (environment.mockData) {
      return this.taskServiceMock.completeTask(task);
    }
    task.completed = !task.completed
    const url = new URL(
      `${servicePrefix}task/${task.taskID}/completed/${task.completed}`,
      this.document.location.origin)
    return this.http.put<TaskVO>(url.toString(), {}).pipe(
      map( (result: TaskVO) => {
        return Object.assign(new TaskVO(), result);
      })
    );
  };

}
