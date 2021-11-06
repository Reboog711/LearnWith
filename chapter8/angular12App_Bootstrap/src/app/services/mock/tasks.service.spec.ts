import { TestBed } from '@angular/core/testing';

import { TasksServiceMock } from './tasks.service';
import {Observable} from "rxjs";
import {TaskCategoryVO} from "../../vo/task-category-vo";
import {TaskVO} from "../../vo/task-vo";
import {task5} from "../../mock/tasks-mock";
import {TaskFilterVO} from "../../vo/task-filter-vo";

describe('TasksServiceMock', () => {
  let service: TasksServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('loadTasks()', () => {

    it('should return completed tasks', (done) => {
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        completed : true
      })
      service.loadTasks(taskFilter).subscribe((results) => {
        expect(results.length).toBe(6);
        done();
      })
    })
    it('should return not completed tasks', (done) => {
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        completed : false
      })
      service.loadTasks(taskFilter).subscribe((results) => {
        expect(results.length).toBe(26);
        done();
      })
    })
    it('should return task categoryID =1', (done) => {
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        taskCategoryID: 1
      })
      service.loadTasks(taskFilter).subscribe((results) => {
        expect(results.length).toBe(18);
        done();
      })
    })
    it('should return task categoryID =0', (done) => {
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        taskCategoryID: 0
      })
      service.loadTasks(taskFilter).subscribe((results) => {
        expect(results.length).toBe(32);
        done();
      })
    })
    it('should return task with specific start date', (done) => {
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        startDateAsUTCString: new Date("4/17/2021").toISOString()
      })
      service.loadTasks(taskFilter).subscribe((results) => {
        expect(results.length).toBe(26);
        done();
      })
    })
    it('should return task with specific end date', (done) => {
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        endDateAsUTCString: new Date("4/17/2021").toISOString()
      })
      service.loadTasks(taskFilter).subscribe((results) => {
        expect(results.length).toBe(6);
        done();
      })
    })
    it('should return task with specific scheduled start date', (done) => {
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        scheduledStartDateAsUTCString: new Date("4/17/2021").toISOString()
      })
      service.loadTasks(taskFilter).subscribe((results) => {
        expect(results.length).toBe(10);
        done();
      })
    })
    it('should return task with specific scheduled end date', (done) => {
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        scheduledEndDateAsUTCString: new Date("4/17/2021").toISOString()
      })
      service.loadTasks(taskFilter).subscribe((results) => {
        expect(results.length).toBe(6);
        done();
      })
    })
    it('should return task with specific scheduled equal date', (done) => {
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        scheduledEqualDateAsUTCString: new Date("4/17/2021").toISOString()
      })
      service.loadTasks(taskFilter).subscribe((results) => {
        expect(results.length).toBe(2);
        done();
      })
    })

  });

  describe('scheduleTaskList()', () => {
    it('Should return updated message', (done: DoneFn) => {
      let o : Observable<any> = service.scheduleTaskList([]);
      o.subscribe((value) => {
        expect(value.message).toBe('Updated!');
        done();
      });
    });
    it('Should return updated message after date sent in', (done: DoneFn) => {
      let o : Observable<any> = service.scheduleTaskList([], new Date().toISOString());
      o.subscribe((value) => {
        expect(value.message).toBe('Updated!');
        done();
      });
    });

  })


});
