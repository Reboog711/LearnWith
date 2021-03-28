import { TestBed } from '@angular/core/testing';

import { TaskServiceCF } from './task.service';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AppComponent} from "../../app.component";
import {LoginComponent} from "../../views/login/login.component";
import {TasksComponent} from "../../views/tasks/tasks.component";
import {TaskGridComponent} from "../../views/task-grid/task-grid.component";
import {TaskFilterComponent} from "../../views/task-filter/task-filter.component";
import {TaskCuComponent} from "../../views/task-cu/task-cu.component";
import {TaskSchedulerComponent} from "../../views/task-scheduler/task-scheduler.component";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthenticationService} from "../mock/authentication.service";
import {TaskService} from "../mock/task.service";
import {DatePipe} from "@angular/common";
import {HttpUtils} from "./http-utils";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TaskVO} from "../../vo/task-vo";
import {UserVO} from "../../vo/user-vo";

describe('TaskServiceCF', () => {
  const urlString = '/coldFusion/com/dotComIt/learnWith/services/TaskService.cfc';
  let service: TaskServiceCF;
  let httpMock : HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgxDatatableModule,
        NgbModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        TasksComponent,
        TaskGridComponent,
        TaskFilterComponent,
        TaskCuComponent,
        TaskSchedulerComponent
      ],
      providers: [
        AuthGuard,
        AuthenticationService,
        TaskService
      ]
    }).compileComponents();
    service = TestBed.inject(TaskServiceCF);
  });
  beforeEach(()=>{
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('loadTaskCategories() ', function () {
    it('Should load Task Categories', () => {
      service.loadTaskCategories().subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(3);
        });
      const req = httpMock.expectOne(urlString) ;

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual('method=getTaskCategories');
      req.flush({"resultObject":[
          {},
          { taskCategoryID :1, taskCategory:"Business"},
          { taskCategoryID :2, taskCategory:"Personal"}
        ],"error":0});
    });
  });

  describe('loadTask() ', function () {
    let resultArray : object[] = [
      { }, { }, { }, { }, { },
      { }, { }, { }, { }, { },
      { }, { }, { }, { }, { },
      { }, { }, { }, { }, { },
      { }, { }, { }, { }, { }
    ];

    it('Should Load Completed Tasks', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.completed = true;
      service.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      const req = httpMock.expectOne(urlString) ;

      expect(req.request.method).toEqual('POST');

      let parameters : Object = {
        method : "getFilteredTasks",
        filter : taskFilter
      };

      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Should Load Not Completed Tasks', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.completed = false;
      service.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      const req = httpMock.expectOne(urlString) ;

      expect(req.request.method).toEqual('POST');

      let parameters : Object = {
        method : "getFilteredTasks",
        filter : taskFilter
      };

      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Should Load Tasks where taskCategoryID is 1', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.taskCategoryID = 1;
      service.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      const req = httpMock.expectOne(urlString) ;

      expect(req.request.method).toEqual('POST');

      let parameters : Object = {
        method : "getFilteredTasks",
        filter : taskFilter
      };

      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Should load tasks where  Start Date is 04/28/2016', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.startDate = new Date("04/28/2016");
      service.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      const req = httpMock.expectOne(urlString) ;

      expect(req.request.method).toEqual('POST');

      let parameters : Object = {
        method : "getFilteredTasks",
        filter : taskFilter
      };

      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Should Load tasks where End Date 04/28/2016', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.endDate = new Date("05/28/2017");
      service.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      const req = httpMock.expectOne(urlString) ;

      expect(req.request.method).toEqual('POST');

      let parameters : Object = {
        method : "getFilteredTasks",
        filter : taskFilter
      };

      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Should load tasks where Schedule Start Date is 11/22/2017', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.scheduledStartDate = new Date("11/22/2017");
      service.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      const req = httpMock.expectOne(urlString) ;

      expect(req.request.method).toEqual('POST');

      let parameters : Object = {
        method : "getFilteredTasks",
        filter : taskFilter
      };

      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Should load tasks where Schedule End Date is 11/22/2017', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.scheduledEndDate = new Date("11/22/2017");
      service.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      const req = httpMock.expectOne(urlString) ;

      expect(req.request.method).toEqual('POST');

      let parameters : Object = {
        method : "getFilteredTasks",
        filter : taskFilter
      };

      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Should load tasks where Schedule Equal Date is 11/22/2017', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.scheduledEqualDate = new Date("11/22/2017");
      service.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      const req = httpMock.expectOne(urlString) ;

      expect(req.request.method).toEqual('POST');

      let parameters : Object = {
        method : "getFilteredTasks",
        filter : taskFilter
      };

      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"resultObject":resultArray,"error":0});
    });

  });

  describe('updateTask() ', function () {
    it('Should Create Task', () => {
      let task : TaskVO  = {taskID:0, taskCategoryID : 2, description:'Brand New Task 1'} as TaskVO;
      let user : UserVO = { } as UserVO;

      service.updateTask(task, user).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject[0].taskID).toBe(32);
          expect(value.resultObject[0].taskCategory).toBe('Personal');
        });
      const req = httpMock.expectOne(urlString) ;

      let parameters = {
        method: "createTask",
        taskCategoryID: task.taskCategoryID,
        description: task.description,
        taskID: task.taskID,
        userID : user.userID
      };

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"resultObject":[{taskID:32, taskCategoryID : 2, taskCategory : "Personal", description:'Brand New Task 1'}],"error":0});
    });

    it('Should Update Task', () => {
      let task : TaskVO  = {taskID:1, taskCategoryID : 1} as TaskVO;
      let user : UserVO = { } as UserVO;

      service.updateTask(task, user).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject[0].taskID).toBe(1);
          expect(value.resultObject[0].taskCategory).toBe('Business');
        });
      const req = httpMock.expectOne(urlString) ;

      let parameters = {
        method: "updateTask",
        taskCategoryID: task.taskCategoryID,
        description: task.description,
        taskID: task.taskID,
        userID : user.userID
      };

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"resultObject":[{taskID:1, taskCategoryID : 1, taskCategory : "Business", description:'Brand New Task 1'}],"error":0});
    });

  });

  describe('scheduleTask() ', function () {
    it('Should Schedule Task', () => {
      let task : TaskVO  = {taskID:10, taskCategoryID : 2} as TaskVO;

      service.scheduleTask(task).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject[0].taskID).toBe(10);
          expect(value.resultObject[0].taskCategoryID).toBe(2);
        });
      const req = httpMock.expectOne(urlString) ;

      let parameters = {
        method : "scheduleTask",
        taskID : task.taskID
      };

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"resultObject":[task],"error":0});
    });

  });

  describe('scheduleTaskList() ', function () {
    it('Should Schedule Multiple Tasks', () => {
      let tasks : TaskVO[]  = [];
      let datePipe : DatePipe = new DatePipe('en-US');
      let taskIDList : string = '';
      let schedulerDate : Date = new Date("11/22/2017");

      service.scheduleTaskList(tasks,schedulerDate).subscribe(
        value => {
          expect(value.error).toBeFalsy();
        });
      const req = httpMock.expectOne(urlString) ;


      let parameters = {
        method : "scheduleTaskList",
        taskIDList : taskIDList,
        dateScheduled :  datePipe.transform(schedulerDate, 'shortDate')
      };

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"error":0});
    });

  });

  describe('completeTask() ', function () {
    let task : TaskVO = {taskCategoryID:1,taskID:10,completed:true} as TaskVO;

    it('Should mark task completed', () => {
      task.completed = true;
      service.completeTask(task).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject[0].completed).toBeTruthy();
        });
      const req = httpMock.expectOne(urlString) ;

      let parameters = {
        method : "completeTask",
        taskID  : task.taskID,
        completed  :  !task.completed
      };

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"resultObject":[task],"error":0});
    });

    it('Should mar task Not Completed', () => {
      task.completed = false;

      service.completeTask(task).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject[0].completed).toBeFalsy();
        });
      const req = httpMock.expectOne(urlString) ;

      let parameters = {
        method : "completeTask",
        taskID  : task.taskID,
        completed  :  !task.completed
      };

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(HttpUtils.transformRequest(parameters));
      req.flush({"resultObject":[task],"error":0});
    });

  });

  afterEach(() => {
    httpMock.verify();
  });
});
