import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGridComponent } from './task-grid.component';
import {AppComponent} from "../../app.component";
import {LoginComponent} from "../login/login.component";
import {TasksComponent} from "../tasks/tasks.component";
import {TaskFilterComponent} from "../task-filter/task-filter.component";
import {TaskCuComponent} from "../task-cu/task-cu.component";
import {TaskSchedulerComponent} from "../task-scheduler/task-scheduler.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthenticationService} from "../../services/mock/authentication.service";
import {TaskService} from "../../services/mock/task.service";
import {TaskModel} from "../../model/task-model";
import {Observable, Observer} from "rxjs";
import {ResultObjectVO} from "../../vo/result-object-vo";
import {TaskVO} from "../../vo/task-vo";
import {TaskFilterVO} from "../../vo/task-filter-vo";

describe('TaskGridComponent', () => {
  let component: TaskGridComponent;
  let fixture: ComponentFixture<TaskGridComponent>;
  let taskService: TaskService;
  let taskModel: TaskModel;

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
        TaskService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskGridComponent);
    taskService = TestBed.get(TaskService);
    taskModel = TestBed.get(TaskModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('loadTasks()', function() {

    it('Failure', function () {
      spyOn(taskService, 'loadTasks').and.returnValue(
        Observable.create((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = true;
          observer.next(result);
          observer.complete();
        })
      );
      component.loadTasks(new TaskFilterVO());
      expect(component.taskLoadError).toBe('We could not load any tasks.');
    });

    it('Success', function () {
      // cheating when creating the results array by not populating objects
      let results : TaskVO[] = [new TaskVO(),new TaskVO(),new TaskVO()] ;

      spyOn(taskService, 'loadTasks').and.returnValue(
        Observable.create((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = false;
          result.resultObject = results;
          observer.next(result);
          observer.complete();
        })
      );
      component.loadTasks(new TaskFilterVO());
      expect(taskModel.tasks).toBe(results);
      expect(component.tasks).toBe(results);
      expect(component.tasks.length).toBe(3);
    });

  });

  describe('onEditTask()', function() {

    it('Emit onEditTask', function () {
      spyOn(component.editTaskRequest,"emit")
      component.onEditTask("something");
      expect(component.editTaskRequest.emit).toHaveBeenCalledWith("something");
    });
  });

  describe('onScheduleTaskRequest()', function() {

    it('Call onScheduleTaskRequest', function () {
      spyOn(taskModel,"onScheduleTaskRequest")
      component.onScheduleTaskRequest("something");
      expect(taskModel.onScheduleTaskRequest).toHaveBeenCalledWith("something");
    });
  });

  describe('onCompletedCheckBoxChange()', function() {

    it('Failure', function () {
      spyOn(taskService, 'completeTask').and.returnValue(
        Observable.create((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = true;
          observer.next(result);
          observer.complete();
        })
      );
      component.onCompletedCheckBoxChange(new TaskVO());
      expect(component.taskLoadError).toBe('Error completing the task.');
    });

    it('Success', function () {
      // cheating when creating the results array by not populating objects
      let results : TaskVO[] = [new TaskVO()] ;
      taskModel.tasks = [];
      spyOn(taskModel,"replaceTask");

      spyOn(taskService, 'completeTask').and.returnValue(
        Observable.create((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = false;
          result.resultObject = results;
          observer.next(result);
          observer.complete();
        })
      );
      component.onCompletedCheckBoxChange(results[0]);
      expect(taskModel.replaceTask).toHaveBeenCalledWith(results[0]);
    });
  });
});
