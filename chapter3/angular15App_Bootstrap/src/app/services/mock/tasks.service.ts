import { Injectable } from '@angular/core';
import {DataStoreService} from "./data-store.service";
import {Observable, Observer} from "rxjs";
import {TaskVO} from "../../vo/task-vo";
import {TaskFilterVO} from "../../vo/task-filter-vo";

@Injectable({
  providedIn: 'root'
})
export class TasksServiceMock {

  constructor(private dataStoreService: DataStoreService) { }

  loadTasks(filter : TaskFilterVO) : Observable<TaskVO[]> {
    let o : Observable<TaskVO[]> = new Observable(
      (observer : Observer<TaskVO[]>) => {
        setTimeout(() => {
          let result : TaskVO[] = this.dataStoreService.tasks.filter(
            (element, index, array) => {
              if (!(typeof filter.completed === 'undefined') &&
                (filter.completed !== null)) {
                if (filter.completed !== element.completed) {
                  return false;
                }
              };
              if (filter.startDateAsUTCString) {
                if (new Date(filter.startDateAsUTCString) >
                  new Date(element.dateCreatedAsUTCString)) {
                  return false;
                }
              }
              return true;
            }
          );
          observer.next(result);
          observer.complete();
        }, 1000);

      });
    return o;
  }

}
