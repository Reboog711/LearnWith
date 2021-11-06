import { Injectable } from '@angular/core';
import {DataStoreService} from "./data-store.service";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {Observable, Observer} from "rxjs";
import {TaskVO} from "../../vo/task-vo";

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
              debugger;
              if (!(typeof filter.completed === 'undefined') &&
                (filter.completed !== null)) {
                if (filter.completed !== element.completed) {
                  return false;
                }
              };
              if (!(typeof filter.taskCategoryID === 'undefined') &&
                (filter.taskCategoryID !== null)) {
                if ((filter.taskCategoryID !== 0) &&
                  (filter.taskCategoryID !== element.taskCategoryID)) {
                  return false;
                }
              };
              if (filter.startDateAsUTCString) {
                if (new Date(filter.startDateAsUTCString) > new Date(element.dateCreatedAsUTCString)) {
                  return false;
                }
              }
              if (filter.endDateAsUTCString) {
                if (new Date(filter.endDateAsUTCString) < new Date(element.dateCreatedAsUTCString)) {
                  return false;
                }
              }

              if (filter.scheduledStartDateAsUTCString) {
                if (!element.dateScheduledAsUTCString) {
                  return false;
                }
                if (new Date(filter.scheduledStartDateAsUTCString) > new Date(element.dateScheduledAsUTCString)) {
                  return false;
                }
              }
              if (filter.scheduledEndDateAsUTCString) {
                if (!element.dateScheduledAsUTCString) {
                  return false;
                }
                if (new Date(filter.scheduledEndDateAsUTCString) < new Date(element.dateScheduledAsUTCString)) {
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
