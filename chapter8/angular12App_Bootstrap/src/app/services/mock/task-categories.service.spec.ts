import { TestBed } from '@angular/core/testing';

import { TaskCategoriesServiceMock } from './task-categories.service';
import {Observable} from "rxjs";
import {UserVO} from "../../vo/user-vo";
import {TaskCategoryVO} from "../../vo/task-category-vo";

describe('TaskCategoriesServiceMock', () => {
  let service: TaskCategoriesServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCategoriesServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should load task categories', (done: DoneFn) => {
    let o : Observable<TaskCategoryVO[]> = service.loadTaskCategories();
    o.subscribe((value) => {
      expect(value.length).toBe(2);
      expect(value[0]).toEqual(Object.assign(new TaskCategoryVO(), { taskCategoryID :1, taskCategory:"Business"}));
      expect(value[1]).toEqual(Object.assign(new TaskCategoryVO(), { taskCategoryID :2, taskCategory:"Personal"}));
      done();
    });
  });

});
