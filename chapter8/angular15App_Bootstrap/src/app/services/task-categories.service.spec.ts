import { TestBed } from '@angular/core/testing';

import { TaskCategoriesService } from './task-categories.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../environments/environment";
import {userMock} from "../mock/user-mock";
import {TaskCategoryVO} from "../vo/task-category-vo";
import {UserVO} from "../vo/user-vo";

describe('TaskCategoriesService', () => {
  const urlString = 'taskcategories';
  let service: TaskCategoriesService;
  let httpMock : HttpTestingController;

  beforeEach(() => {
    environment.mockData = false;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TaskCategoriesService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadTaskCategories()', () => {
    it('should relay to mock service', () => {
      spyOn(service['taskCategoriesServiceMock'], 'loadTaskCategories');
      environment.mockData = true;
      service.loadTaskCategories();
      expect(service['taskCategoriesServiceMock'].loadTaskCategories).toHaveBeenCalledWith();
    })

    it('Should load task categories succesfully', () => {
      const user = Object.assign(new UserVO(), userMock)
      service.loadTaskCategories().subscribe(
        value => {
          expect(value[0] instanceof TaskCategoryVO).toBeTruthy();
        })
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('GET');
      const results = [
        {taskCategoryID: 1, taskCategory: 'test'}
      ]
      req.flush(results);
    });

  })

  afterEach(() => {
    httpMock.verify();
  });
});
