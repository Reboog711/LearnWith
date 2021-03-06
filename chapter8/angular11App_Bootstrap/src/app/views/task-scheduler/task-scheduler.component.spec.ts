import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSchedulerComponent } from './task-scheduler.component';
import {AppComponent} from "../../app.component";
import {LoginComponent} from "../login/login.component";
import {TasksComponent} from "../tasks/tasks.component";
import {TaskGridComponent} from "../task-grid/task-grid.component";
import {TaskFilterComponent} from "../task-filter/task-filter.component";
import {TaskCuComponent} from "../task-cu/task-cu.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbDateStruct, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthenticationService} from "../../services/mock/authentication.service";
import {TaskService} from "../../services/mock/task.service";
import {TaskModel} from "../../model/task-model";
import {Observable, Observer} from "rxjs";
import {ResultObjectVO} from "../../vo/result-object-vo";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TaskVO} from "../../vo/task-vo";

describe('TaskSchedulerComponent', () => {
  let component: TaskSchedulerComponent;
  let fixture: ComponentFixture<TaskSchedulerComponent>;
  let taskService : TaskService;
  let taskModel: TaskModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        TaskService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSchedulerComponent);
    taskService = TestBed.inject(TaskService);
    taskModel = TestBed.inject(TaskModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialLoad()', () => {

    it('should call loadTasks()', () => {
      spyOn(component,"loadTasks")
      let date : Date = new Date();
      component.initialLoad(date);
      expect(component.loadTasks).toHaveBeenCalled();
    });
  });

  describe('loadTasks()', () => {

    it('should set schedulerError when loadTasks() service fails', () => {
      spyOn(taskService, 'loadTasks').and.returnValue(
        new Observable((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = true;
          observer.next(result);
          observer.complete();
        })
      );
      component.loadTasks(new TaskFilterVO());
      expect(component.schedulerError).toBe('We could not load any tasks.');
    });

    it('Should set schedulerError when loadTasks() service fails', () => {
      // cheating when creating the results array by not populating objects
      let results : TaskVO[] = [new TaskVO(),new TaskVO(),new TaskVO()] ;
      taskModel.addedTasks = [];
      spyOn(taskService, 'loadTasks').and.returnValue(
        new Observable((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = false;
          result.resultObject = results;
          observer.next(result);
          observer.complete();
        })
      );
      component.loadTasks(new TaskFilterVO());
      // I think the concat makes the arrays no longer the same object, so toBe was failing
      expect(taskModel.scheduledTasks[0]).toBe(results[0]);
      expect(taskModel.scheduledTasks.length).toBe(3);
    });
    it('Should add tasks to taskModel.ScheduledTasks after tasks loaded from service', () => {
      // cheating when creating the results array by not populating objects
      let results : TaskVO[] = [new TaskVO(),new TaskVO(),new TaskVO()] ;
      taskModel.addedTasks = [new TaskVO(),new TaskVO(),new TaskVO()];
      spyOn(taskService, 'loadTasks').and.returnValue(
        new Observable((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = false;
          result.resultObject = results;
          observer.next(result);
          observer.complete();
        })
      );
      component.loadTasks(new TaskFilterVO());
      expect(taskModel.scheduledTasks.length).toBe(6);
    });

  });

  describe('onScheduleDateChange()', () => {

    it('Should call loadTasks() when the scheduler date changes', () => {
      spyOn(component,"loadTasks")
      component.schedulerDate = ({year:2017,day:20, month:10 }) as NgbDateStruct;
      component.onScheduleDateChange();
      expect(component.loadTasks).toHaveBeenCalled();
    });
    it('Shouold not call loadTasks() if SchedulerDate does not ch  ange', () => {
      spyOn(component,"loadTasks")
      // commented out line worked in Angular 10 and less before I enabled strict mode
//      component.schedulerDate = ({year:null,day:null, month:null }) as NgbDateStruct;;
      component.schedulerDate = {} as NgbDateStruct;;
      component.onScheduleDateChange();
      expect(component.loadTasks).not.toHaveBeenCalled();
    });
  });

  describe('onTaskUnschedule()', () => {
    it('Should null dateScheduled on task after a task is unscheduled', () => {
      let task : TaskVO = new TaskVO();
      task.dateScheduled = new Date();
      spyOn(component,"scheduleTask")
      component.onTaskUnschedule(task);
      expect(component.scheduleTask).toHaveBeenCalledWith(task);
      expect(task.dateScheduled).toBeNull();
    });
  });

  describe('deleteTaskFromSchedule()', () => {

    it('Should Add Task to ScheduledTasks and AddedTasks', () => {
      let task : TaskVO = new TaskVO();
      taskModel.scheduledTasks = [task,new TaskVO(),new TaskVO()]
      let oldScheduledTasksLength : Number = taskModel.scheduledTasks.length;
      taskModel.addedTasks = [new TaskVO(),new TaskVO()]
      let oldAddedModelLength : Number = taskModel.addedTasks.length;

      component.deleteTaskFromSchedule(task);
      let newScheduledTasksLength : Number = taskModel.scheduledTasks.length+1;
      let newAddedModelLength : Number = taskModel.addedTasks.length;

      expect(oldScheduledTasksLength).toBe(newScheduledTasksLength);
      expect(oldAddedModelLength).toBe(newAddedModelLength);
    });

    it('Should Remove Task From ScheduledTasks and addedTasks', () => {
      let task : TaskVO = new TaskVO();
      taskModel.scheduledTasks = [task,new TaskVO(),new TaskVO()]
      let oldScheduledTasksLength : Number = taskModel.scheduledTasks.length;
      taskModel.addedTasks = [new TaskVO(),new TaskVO(),task]
      let oldAddedModelLength : Number = taskModel.addedTasks.length;

      component.deleteTaskFromSchedule(task);
      let newScheduledTasksLength : Number = taskModel.scheduledTasks.length+1;
      let newAddedModelLength : Number = taskModel.addedTasks.length+1;

      expect(oldScheduledTasksLength).toBe(newScheduledTasksLength);
      expect(oldAddedModelLength).toBe(newAddedModelLength);
    });
  });

  describe('scheduleTask()', () => {

    it('Should set schedulerError when service fails', () => {
      spyOn(taskService, 'scheduleTask').and.returnValue(
        new Observable((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = true;
          observer.next(result);
          observer.complete();
        })
      );
      component.scheduleTask(new TaskVO());
      expect(component.schedulerError).toBe('We could not remove the task from the schedule.');
    });

    it('Should add new task to ScheduleTask list when service call succeeds and task not in scheduledtask list', () => {
      // cheating when creating the results array by not populating objects
      taskModel.tasks = [{taskID : 1, description:'something'} as TaskVO, {taskID : 2, description:'something else'} as TaskVO];
      let task = {taskID : 1, description:'something else'} as TaskVO;
      let results : TaskVO[] = [task] ;

      spyOn(taskModel, 'replaceTask').and.callThrough();
      spyOn(component, 'deleteTaskFromSchedule');
      spyOn(taskService, 'scheduleTask').and.returnValue(
        new Observable((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = false;
          result.resultObject = results;
          observer.next(result);
          observer.complete();
        })
      );
      component.scheduleTask(task);
      expect(taskModel.replaceTask).toHaveBeenCalled();
      expect(taskModel.tasks[0].description).toBe("something else");
    });
    it('Should call replaceTask() and deleteTaskFromSchedule() when task is scheduled', () => {
      // cheating when creating the results array by not populating objects
      taskModel.tasks = [{taskID : 1, description:'something'} as TaskVO, {taskID : 2, description:'something else'} as TaskVO];
      let task = {taskID : 1, description:'something else'} as TaskVO;
      let results : TaskVO[] = [task] ;
      taskModel.scheduledTasks = [task, {taskID : 2, description:'something else'} as TaskVO];

      spyOn(taskModel, 'replaceTask').and.callThrough();
      spyOn(component, 'deleteTaskFromSchedule');
      spyOn(taskService, 'scheduleTask').and.returnValue(
        new Observable((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = false;
          result.resultObject = results;
          observer.next(result);
          observer.complete();
        })
      );
      component.scheduleTask(task);
      expect(taskModel.replaceTask).toHaveBeenCalled();
      expect(component.deleteTaskFromSchedule).toHaveBeenCalled();
      expect(taskModel.tasks[0].description).toBe("something else");
    });
  });

  describe('onTaskListSchedule()', () => {

    it('Should set schedulerError when scheduleTaskList() call returns error', () => {
      component.schedulerDate = {year:2017, month:10, day:10} as  NgbDateStruct;
//            taskModel.scheduledTasks = [new TaskVO(), new TaskVO(), new TaskVO()];
      spyOn(taskService, 'scheduleTaskList').and.returnValue(
        new Observable((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = true;
          observer.next(result);
          observer.complete();
        })
      );
      component.onTaskListSchedule();
      expect(component.schedulerError).toBe('We had an error scheduling all the tasks.');
    });

    it('Should load tasks when onTaskListSchedule( is called', () => {
      component.schedulerDate = {year:2017, month:10, day:10} as  NgbDateStruct;
      taskModel.tasks = [{taskID : 1} as TaskVO, new TaskVO(), new TaskVO()];
      taskModel.scheduledTasks = [{taskID : 1} as TaskVO, new TaskVO(), new TaskVO()];
      spyOn(taskService, 'scheduleTaskList').and.returnValue(
        new Observable((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = false;
          observer.next(result);
          observer.complete();
        })
      );
      component.onTaskListSchedule();
      const task: TaskVO = taskModel.tasks[0];
      expect(task?.dateScheduled?.getFullYear()).toBe(component.schedulerDate.year);
      expect(taskModel.addedTasks.length).toBe(0);
    });

  });

});
