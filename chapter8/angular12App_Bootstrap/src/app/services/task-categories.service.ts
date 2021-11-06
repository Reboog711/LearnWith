import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskCategoryVO} from "../vo/task-category-vo";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {TaskCategoriesServiceMock} from "./mock/task-categories.service";


const servicePrefix : string = `${environment.serverPrefix}`;

@Injectable({
  providedIn: 'root'
})
export class TaskCategoriesService {

  constructor(private http: HttpClient, private taskCategoriesServiceMock: TaskCategoriesServiceMock) { }

  loadTaskCategories(): Observable<TaskCategoryVO[]> {

    if (environment.mockData) {
      return this.taskCategoriesServiceMock.loadTaskCategories();
    }

    return this.http.get<TaskCategoryVO[]>(`${servicePrefix}taskcategories`).pipe(
      map( (results: TaskCategoryVO[]) => {
        return results.map((item: Object) => Object.assign(new TaskCategoryVO(), item));
      })
    );

  }
}
