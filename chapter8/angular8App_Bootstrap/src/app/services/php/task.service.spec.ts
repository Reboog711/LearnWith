import {async, TestBed} from '@angular/core/testing';

import { TaskServicePHP } from './task.service';
import {TaskService} from "../mock/task.service";
import {AppComponent} from "../../app.component";
import {LoginComponent} from "../../views/login/login.component";
import {TasksComponent} from "../../views/tasks/tasks.component";
import {TaskGridComponent} from "../../views/task-grid/task-grid.component";
import {TaskFilterComponent} from "../../views/task-filter/task-filter.component";
import {TaskCuComponent} from "../../views/task-cu/task-cu.component";
import {TaskSchedulerComponent} from "../../views/task-scheduler/task-scheduler.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthenticationService} from "../mock/authentication.service";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TaskVO} from "../../vo/task-vo";
import {UserVO} from "../../vo/user-vo";
import {DatePipe} from "@angular/common";

describe('TaskService  PHP', () => {
  const urlString = '/php/';
  let taskService : TaskService;
  let httpMock : HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        TasksComponent,
        TaskGridComponent,
        TaskFilterComponent,
        TaskCuComponent,
        TaskSchedulerComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgxDatatableModule,
        NgbModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthGuard,
        AuthenticationService,
        {provide: TaskService, useClass:TaskServicePHP},
      ]
    }).compileComponents();
  }));
  beforeEach(()=>{
    taskService = TestBed.get(TaskService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });


  describe('loadTaskCategories() ', function () {
    it('Task Categories Loaded', () => {
      taskService.loadTaskCategories().subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(3);
        });
      let url = urlString+ 'com/dotComIt/learnWith/api/taskCategories/'
      const req = httpMock.expectOne(url) ;

      expect(req.request.method).toEqual('GET');
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

    it('Load Completed Tasks', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.completed = true;
      taskService.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });
      let url = urlString+ 'com/dotComIt/learnWith/api/tasks/?completed=true'
      const req = httpMock.expectOne(url) ;

      expect(req.request.method).toEqual('GET');

      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Load Not Completed Tasks', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.completed = false;
      taskService.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      let url = urlString+ 'com/dotComIt/learnWith/api/tasks/?completed=false'
      const req = httpMock.expectOne(url) ;

      expect(req.request.method).toEqual('GET');

      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Load Task Category ID 1', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.taskCategoryID = 1;
      taskService.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      let url = urlString+ 'com/dotComIt/learnWith/api/tasks/?taskCategoryID=1'
      const req = httpMock.expectOne(url) ;

      expect(req.request.method).toEqual('GET');

      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Load Start Date 04/28/2016', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.startDate = new Date("04/28/2016");
      taskService.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      let url = urlString+ 'com/dotComIt/learnWith/api/tasks/?startDate=4/28/2016'
      const req = httpMock.expectOne(url) ;

      expect(req.request.method).toEqual('GET');
      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Load End Date 05/28/2017', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.endDate = new Date("05/28/2017");
      taskService.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      let url = urlString+ 'com/dotComIt/learnWith/api/tasks/?endDate=5/28/2017'
      const req = httpMock.expectOne(url) ;

      expect(req.request.method).toEqual('GET');
      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Schedule Start Date 11/22/2017', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.scheduledStartDate = new Date("11/22/2017");
      taskService.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      let url = urlString+ 'com/dotComIt/learnWith/api/tasks/?scheduledStartDate=11/22/2017'
      const req = httpMock.expectOne(url) ;

      expect(req.request.method).toEqual('GET');

      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Schedule End Date 11/22/2017', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.scheduledEndDate = new Date("11/22/2017");
      taskService.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      let url = urlString+ 'com/dotComIt/learnWith/api/tasks/?scheduledEndDate=11/22/2017'
      const req = httpMock.expectOne(url) ;

      expect(req.request.method).toEqual('GET');
      req.flush({"resultObject":resultArray,"error":0});
    });

    it('Schedule Equal Date 11/22/2017', () => {
      var taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.scheduledEqualDate = new Date("11/22/2017");
      taskService.loadTasks(taskFilter).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.length).toBe(25);
        });

      let url = urlString+ 'com/dotComIt/learnWith/api/tasks/?scheduledEqualDate=11/22/2017'
      const req = httpMock.expectOne(url) ;

      expect(req.request.method).toEqual('GET');
      req.flush({"resultObject":resultArray,"error":0});
    });

  });

  describe('updateTask() ', function () {
    it('Create Task', () => {
      let task : TaskVO  = {taskID:0, taskCategoryID : 2, description:'Brand New Task 1'} as TaskVO;
      let user : UserVO = { } as UserVO;

      taskService.updateTask(task, user).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject[0].taskID).toBe(32);
          expect(value.resultObject[0].taskCategory).toBe('Personal');
        });
      let url = urlString+ 'com/dotComIt/learnWith/api/task/'
      const req = httpMock.expectOne(url) ;

      let parameters = {
        taskCategoryID: task.taskCategoryID,
        description: task.description,
        userID : user.userID
      };

      expect(req.request.method).toEqual('POST');
      expect(req.request.body.userID).toEqual(task.userID);
      expect(req.request.body.description).toEqual(task.description);
      expect(req.request.body.taskCategoryID).toEqual(task.taskCategoryID);
      req.flush({"resultObject":[{taskID:32, taskCategoryID : 2, taskCategory : "Personal", description:'Brand New Task 1'}],"error":0});
    });

    it('Update Task', () => {
      let task : TaskVO  = {taskID:1, taskCategoryID : 1} as TaskVO;
      let user : UserVO = { } as UserVO;

      taskService.updateTask(task, user).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject[0].taskID).toBe(1);
          expect(value.resultObject[0].taskCategory).toBe('Business');
        });
      let url = urlString+ 'com/dotComIt/learnWith/api/task/'
      const req = httpMock.expectOne(url) ;

      let parameters = {
        taskCategoryID: task.taskCategoryID,
        description: task.description,
        taskID: task.taskID,
      };

      expect(req.request.method).toEqual('PUT');
      expect(req.request.body.taskID).toEqual(task.taskID);
      expect(req.request.body.description).toEqual(task.description);
      expect(req.request.body.taskCategoryID).toEqual(task.taskCategoryID);
      req.flush({"resultObject":[{taskID:1, taskCategoryID : 1, taskCategory : "Business", description:'Brand New Task 1'}],"error":0});
    });

  });

  describe('scheduleTask() ', function () {
    it('Schedule Task', () => {
      let task : TaskVO  = {taskID:10, taskCategoryID : 2} as TaskVO;

      taskService.scheduleTask(task).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject[0].taskID).toBe(10);
          expect(value.resultObject[0].taskCategoryID).toBe(2);
        });
      let url = urlString + 'com/dotComIt/learnWith/api/task/schedule/';
      const req = httpMock.expectOne(url) ;

      let parameters = {
        taskID : task.taskID
      };

      expect(req.request.method).toEqual('PUT');
      expect(req.request.body.taskID ).toEqual(task.taskID );
      req.flush({"resultObject":[task],"error":0});
    });

  });

  describe('scheduleTaskList() ', function () {
    it('Schedule Task List', () => {
      let tasks : TaskVO[]  = [];
      let datePipe : DatePipe = new DatePipe('en-US');
      let taskIDList : string = '';
      let schedulerDate : Date = new Date("11/22/2017");

      taskService.scheduleTaskList(tasks,schedulerDate).subscribe(
        value => {
          expect(value.error).toBeFalsy();
        });
      let url = urlString + 'com/dotComIt/learnWith/api/task/schedule/';
      const req = httpMock.expectOne(url) ;


      let parameters = {
        taskIDList : taskIDList,
        dateScheduled :   datePipe.transform(schedulerDate, "shortDate")
      };

      expect(req.request.method).toEqual('PUT');
      expect(req.request.body.taskIDList).toEqual(taskIDList);
      expect(req.request.body.dateScheduled).toEqual(parameters.dateScheduled);
      req.flush({"error":0});
    });

  });

  describe('completeTask() ', function () {
    let task : TaskVO = {taskCategoryID:1,taskID:10,completed:true} as TaskVO;

    it('Make task Completed', () => {
      task.completed = true;

      taskService.completeTask(task).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject[0].completed).toBeTruthy();
        });

      let url = urlString + 'com/dotComIt/learnWith/api/task/complete/';
      const req = httpMock.expectOne(url) ;
      let parameters = {
        taskID  : task.taskID,
        completed  :  !task.completed
      };

      expect(req.request.method).toEqual('PUT');
      expect(req.request.body.taskID).toEqual(task.taskID);
      expect(req.request.body.completed).toEqual(!task.completed);
      req.flush({"resultObject":[task],"error":0});
    });

    it('Make task Not Completed', () => {
      task.completed = false;

      taskService.completeTask(task).subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject[0].completed).toBeFalsy();
        });
      let url = urlString + 'com/dotComIt/learnWith/api/task/complete/';
      const req = httpMock.expectOne(url) ;

      let parameters = {
        taskID  : task.taskID,
        completed  :  !task.completed
      };

      expect(req.request.method).toEqual('PUT');
      expect(req.request.body.taskID).toEqual(task.taskID);
      expect(req.request.body.completed).toEqual(!task.completed);
      req.flush({"resultObject":[task],"error":0});
    });

  });

  afterEach(() => {
    httpMock.verify();
  });
});
