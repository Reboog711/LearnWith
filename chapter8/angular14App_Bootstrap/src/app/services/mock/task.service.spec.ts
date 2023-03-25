import { TestBed } from '@angular/core/testing';
import {createMockTaskArray, task5} from 'src/app/mock/tasks-mock';

import { TaskServiceMock } from './task.service';
import {TaskVO} from "../../vo/task-vo";
import {Observable} from "rxjs";

describe('TaskServiceMock', () => {
  let service: TaskServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('updateTask()', () => {
    it('should add new task', (done) => {
      service['dataStore'].tasks = createMockTaskArray();
      const task = Object.assign(new TaskVO(), task5);
      task.taskID = 0;
      task.taskCategoryID = 1;
      let o : Observable<TaskVO> = service.updateTask(task);
      o.subscribe((value) => {
        expect(service['dataStore'].tasks.length).toBe(5)
        expect(value.taskID).toEqual(28);
        expect(value.completed).toBeFalsy();
        expect(value.taskCategory).toBe('Business');
        done();
      });
    })
    it('should update task', (done) => {
      service['dataStore'].tasks = createMockTaskArray();
      const task = Object.assign(new TaskVO(), service['dataStore'].tasks[2]);
      task.taskCategoryID = 2;
      let o : Observable<TaskVO> = service.updateTask(task);
      o.subscribe((value) => {
        expect(service['dataStore'].tasks.length).toBe(4)
        expect(value.taskCategory).toBe('Personal');
        done();
      });
    })
    it('should add new task with no category', (done) => {
      service['dataStore'].tasks = createMockTaskArray();
      const task = Object.assign(new TaskVO(), task5);
      task.taskCategoryID = -1;
      let o : Observable<TaskVO> = service.updateTask(task);
      o.subscribe((value) => {
        expect(service['dataStore'].tasks.length).toBe(4)
        expect(value.taskCategory).toBe('');
        done();
      });
    })

  });

  describe('completeTask()', () => {
    it('Should un complete task', (done: DoneFn) => {
      const task = Object.assign(new TaskVO(), task5);
      task.completed = true;
      let o : Observable<TaskVO> = service.completeTask(task);
      o.subscribe((value) => {
        expect(value.completed).toBeFalsy();
        done();
      });
    });
    it('Should complete task', (done: DoneFn) => {
      const task = Object.assign(new TaskVO(), task5);
      task.completed = false;
      let o : Observable<TaskVO> = service.completeTask(task);
      o.subscribe((value) => {
        expect(value.completed).toBeTruthy();
        done();
      });
    });
  })

});
