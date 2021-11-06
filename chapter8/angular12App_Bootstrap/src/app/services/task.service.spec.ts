import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../environments/environment";
import {UserVO} from "../vo/user-vo";
import {userMock} from "../mock/user-mock";
import {TaskCategoryVO} from "../vo/task-category-vo";
import { TaskVO } from '../vo/task-vo';
import {task1, task5} from "../mock/tasks-mock";

describe('TaskService', () => {
  let service: TaskService;
  let httpMock : HttpTestingController;
  let taskMockAsJSON: any;
  const taskID = 1;

  beforeEach(() => {
    environment.mockData = false;
/*
    TestBed.configureTestingModule({});
*/
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
    taskMockAsJSON = {userID: 1, taskID, description: 'something', completed: false}
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadTask()', () => {

    it('Should load task ', () => {
      const urlString = `task/${taskID}`;
      service.loadTask(taskID).subscribe(
        value => {
          expect(value instanceof TaskVO).toBeTruthy();
        })
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('GET');
      const result = [
        taskMockAsJSON
      ]
      req.flush(result);
    });
  })

  describe('updateTask()', () => {
    beforeEach(() => {
      spyOn<any>(service, 'updateTask_Internal')
      spyOn<any>(service, 'createTask_Internal')
    })
    it('should relay to mock service', () => {
      const task: TaskVO = new TaskVO();
      spyOn(service['taskServiceMock'], 'updateTask');
      environment.mockData = true;
      service.updateTask(task);
      expect(service['taskServiceMock'].updateTask).toHaveBeenCalledWith(task);
    })

    it('should pass onto create task when taskID does not exist', () => {
      const task: TaskVO = new TaskVO();
      service.updateTask(task);
      expect(service['updateTask_Internal']).not.toHaveBeenCalled();
      expect(service['createTask_Internal']).toHaveBeenCalledWith(task);
    })
    it('should pass onto update task when tsakID exists', () => {
      const task: TaskVO = Object.assign(new TaskVO(), {taskID: 1});
      service.updateTask(task);
      expect(service['updateTask_Internal']).toHaveBeenCalledWith(task);
      expect(service['createTask_Internal']).not.toHaveBeenCalled();
    })
  });

  describe('createTask_Internal()', () => {
    it('Should call URL to create a new task, defaulting the taskCategoryID to 0', () => {
      const urlString = 'task';
      const task: TaskVO = Object.assign(new TaskVO(), taskMockAsJSON);
      service['createTask_Internal'](task).subscribe(
        value => {
          expect(value).toEqual(task);
        })
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('POST');
      const results = taskMockAsJSON;
      results.taskCategoryID = 0;
      req.flush(results);
    });

    it('Should call URL to create a new task, without changing taskCategoryID', () => {
      const urlString = 'task';
      const task: TaskVO = Object.assign(new TaskVO(), taskMockAsJSON);
      task.taskCategoryID = 1;
      service['createTask_Internal'](task).subscribe(
        value => {
          expect(value).toEqual(task);
        })
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('POST');
      const results = taskMockAsJSON;
      results.taskCategoryID = 1;
      req.flush(results);
    });
  });

  describe('updateTask_Internal()', () => {
    it('Should call URL to update task, defaulting the taskCategoryID to 0', () => {
      const urlString = `task/${taskMockAsJSON.taskID}`;
      const task: TaskVO = Object.assign(new TaskVO(), taskMockAsJSON);
      service['updateTask_Internal'](task).subscribe(
        value => {
          expect(value).toEqual(task);
        })
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('PUT');
      const results = taskMockAsJSON;
      results.taskCategoryID = 0;
      req.flush(results);
    });

    it('Should call URL to update task, without changing taskCategoryID', () => {
      const urlString = `task/${taskMockAsJSON.taskID}`;
      const task: TaskVO = Object.assign(new TaskVO(), taskMockAsJSON);
      task.taskCategoryID = 1;
      service['updateTask_Internal'](task).subscribe(
        value => {
          expect(value).toEqual(task);
        })
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('PUT');
      const results = taskMockAsJSON;
      results.taskCategoryID = 1;
      req.flush(results);
    });
  });

  describe('completeTask()', () => {
    it('should relay to mock service', () => {
      const task: TaskVO = new TaskVO();
      spyOn(service['taskServiceMock'], 'completeTask');
      environment.mockData = true;
      service.completeTask(task);
      expect(service['taskServiceMock'].completeTask).toHaveBeenCalledWith(task);
    })

    it('Should complete task', () => {

      const task: TaskVO = Object.assign(new TaskVO(), taskMockAsJSON);
      const urlString = `${service['document'].location.origin}/task/${task.taskID}/completed/${!task.completed}`;
      service.completeTask(task).subscribe(
        value => {
          expect(value instanceof TaskVO).toBeTruthy();
        })
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('PUT');
      const result = taskMockAsJSON;
      req.flush(result);
    });
  })

  afterEach(() => {
    httpMock.verify();
  });
});
