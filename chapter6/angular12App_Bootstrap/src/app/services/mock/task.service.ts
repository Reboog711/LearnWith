import { Injectable } from '@angular/core';
import {TaskVO} from "../../vo/task-vo";
import {Observable, Observer} from "rxjs";
import {DataStoreService} from "./data-store.service";

@Injectable({
  providedIn: 'root'
})
export class TaskServiceMock {

  constructor(private dataStore: DataStoreService) { }

  updateTask(task :TaskVO): Observable<TaskVO> {
    let o: Observable<TaskVO> = new Observable(
      (observer: Observer<TaskVO>) => {
        setTimeout(() => {
          if (!task.taskID) {
            task.taskID = this.dataStore.tasks[this.dataStore.tasks.length-1].taskID + 1;
            task.dateCreatedAsUTCString = new Date().toISOString();
            task.completed = false;
            this.dataStore.tasks.push(task);
          }
          task.taskCategoryID = Number(task.taskCategoryID);
          if (task.taskCategoryID === 1) {
            task.taskCategory = 'Business';
          } else if (task.taskCategoryID === 2) {
            task.taskCategory = 'Personal';
          } else {
            task.taskCategory = '';
          }
          observer.next(task);
          observer.complete();

        }, 1000);

      });
    return o;
  };

}
