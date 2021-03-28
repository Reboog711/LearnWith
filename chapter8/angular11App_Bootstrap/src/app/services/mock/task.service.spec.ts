import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {TaskVO} from "../../vo/task-vo";
import {Observable} from "rxjs";
import {ResultObjectVO} from "../../vo/result-object-vo";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {UserVO} from "../../vo/user-vo";

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadTaskCategories() ', () => {
    it('Should load Task Categories', (done: DoneFn) => {
      let o : Observable<ResultObjectVO> = service.loadTaskCategories();
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject.length).toBe(2);
        done();
      });
    });
  });

  describe('loadTask() ', () => {

    it('Should Load Completed Tasks', (done: DoneFn) => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.completed = true;
      let o : Observable<ResultObjectVO> = service.loadTasks(taskFilter);
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject.length).toBe(6);
        done();
      });
    });

    it('Should Load Not Completed Tasks', (done: DoneFn) => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.completed = false;
      let o : Observable<ResultObjectVO> = service.loadTasks(taskFilter);
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject.length).toBe(25);
        done();
      });
    });

    it('Should Load Tasks where taskCategoryID is 1', (done: DoneFn) => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.taskCategoryID = 1;
      let o : Observable<ResultObjectVO> = service.loadTasks(taskFilter);
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject.length).toBe(17);
        done();
      });

    });

    it('Should load tasks where  Start Date is 04/28/2016', (done: DoneFn) => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.startDate = new Date("04/28/2016");
      let o : Observable<ResultObjectVO> = service.loadTasks(taskFilter);
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject.length).toBe(31);
        done();
      });
    });

    it('Should Load tasks where End Date 04/28/2016', (done: DoneFn) => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.endDate = new Date("05/28/2017");
      let o : Observable<ResultObjectVO> = service.loadTasks(taskFilter);
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject.length).toBe(15);
        done();
      });
    });

    it('Should load tasks where Schedule Start Date is 11/22/2017', (done: DoneFn) => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.scheduledStartDate = new Date("11/22/2017");
      let o : Observable<ResultObjectVO> = service.loadTasks(taskFilter);
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject.length).toBe(5);
        done();
      });
    });

    it('Should load tasks where Schedule End Date is 11/22/2017', (done: DoneFn) => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.scheduledEndDate = new Date("11/22/2017");
      let o : Observable<ResultObjectVO> = service.loadTasks(taskFilter);
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject.length).toBe(12);
        done();
      });
    });

    it('Should load tasks where Schedule Equal Date is 11/22/2017', (done: DoneFn) => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.scheduledEqualDate = new Date("11/22/2017");
      let o : Observable<ResultObjectVO> = service.loadTasks(taskFilter);
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject.length).toBe(3);
        done();
      });
    });
  });

  describe('updateTask() ', () => {
    it('Should Create Task', (done: DoneFn) => {
      let task : TaskVO  = Object.assign(new TaskVO(), {taskID:0, taskCategoryID : 2, description:'Brand New Task 1'});
      let user : UserVO = Object.assign(new UserVO(), { });

      let o : Observable<ResultObjectVO> = service.updateTask(task, user);
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject[0].taskID).toBe(32);
        expect(value.resultObject[0].taskCategory).toBe('Personal');
        done();
      });

    });

    it('Should Update Task', (done: DoneFn) => {
      let task : TaskVO  = Object.assign(new TaskVO(), {taskID:1, taskCategoryID : 1});
      let user : UserVO = Object.assign(new UserVO(), { });

      let o : Observable<ResultObjectVO> = service.updateTask(task, user);
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject[0].taskID).toBe(1);
        expect(value.resultObject[0].taskCategory).toBe('Business');
        done();
      });
    });
  });

  describe('scheduleTask() ', () => {
    it('Should Schedule Task', (done: DoneFn) => {
      let task : TaskVO  = Object.assign(new TaskVO(), {taskID:10, taskCategoryID : 2});

      let o : Observable<ResultObjectVO> = service.scheduleTask(task);
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject[0]).toBe(task);
        done();
      });
    });
  });

  describe('scheduleTaskList() ', () => {
    it('Should Schedule Multiple Tasks', (done: DoneFn) => {
      let tasks : TaskVO[]  = [];

      let o : Observable<ResultObjectVO> = service.scheduleTaskList(tasks,new Date("11/22/2017"));
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        done();
      });
    });
  });

  describe('completeTask() ', () => {
    let task : TaskVO = Object.assign(new TaskVO(), {taskCategoryID:1,taskID:10,completed:true});

    it('Should mark task completed', (done: DoneFn) => {
      let task : TaskVO  = Object.assign(new TaskVO(), {taskCategoryID:1,taskID:10,completed:false});

      let o : Observable<ResultObjectVO> = service.completeTask(task);
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject[0].completed).toBeTruthy();

        done();
      });

    });

    it('Should mar task Not Completed', (done: DoneFn) => {
      let task : TaskVO  = Object.assign(new TaskVO(), {taskCategoryID:1, taskID:10, completed :true});

      let o : Observable<ResultObjectVO> = service.completeTask(task);
      o.subscribe(value => {
        expect(value.error).toBeFalsy();
        expect(value.resultObject[0].completed).toBeFalsy();

        done();
      });
    });
  });

});
