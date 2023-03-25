import { Injectable } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {TaskCategoryVO} from "../../vo/task-category-vo";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskCategoriesServiceMock {

  constructor() { }

  loadTaskCategories(): Observable<TaskCategoryVO[]> {


    let o : Observable<TaskCategoryVO[]> = new Observable(
      (observer : Observer<TaskCategoryVO[]>) => {
        setTimeout(() => {
          let result : TaskCategoryVO[] = [];
          result = [
            Object.assign(new TaskCategoryVO(),
              { taskCategoryID :1, taskCategory:"Business"}),
            Object.assign(new TaskCategoryVO(),
              { taskCategoryID :2, taskCategory:"Personal"})
          ];
          observer.next(result);
          observer.complete();
        }, 1000);
      });
    return o;
  };

}
