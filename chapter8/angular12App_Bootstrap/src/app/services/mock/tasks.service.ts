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

              if (filter.scheduledEqualDateAsUTCString) {
                if (!element.dateScheduledAsUTCString) {
                  return false;
                }
                const scheduledEqualDate = new Date(filter.scheduledEqualDateAsUTCString);
                const dateScheduled = new Date(element.dateScheduledAsUTCString);
                let scheduledEqualDatePlusOne = new Date(filter.scheduledEqualDateAsUTCString);
                scheduledEqualDatePlusOne.setDate(scheduledEqualDatePlusOne.getDate()+1);

                if ( !(( scheduledEqualDate <= dateScheduled) && (scheduledEqualDatePlusOne >= dateScheduled))) {
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

  scheduleTaskList(tasks :TaskVO[], schedulerDateAsUTCString? : string): Observable<any> {
    let o: Observable<any> = new Observable (
      (observer: Observer<any>) => {
        setTimeout(() => {
          const result: any = {}
          result['message']= 'Updated!';
          observer.next(result);
          observer.complete();
        }, 1000);
      });
    return o;
  };


}
