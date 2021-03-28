import { ComponentFixture, TestBed } from '@angular/core/testing';

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
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TaskVO} from "../../vo/task-vo";

describe('TaskGridComponent', () => {
  let component: TaskGridComponent;
  let fixture: ComponentFixture<TaskGridComponent>;
  let taskService: TaskService;
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
    fixture = TestBed.createComponent(TaskGridComponent);
    taskService = TestBed.inject(TaskService);
    taskModel = TestBed.inject(TaskModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadTasks()', () => {

    it('Should set taskLoadError when services fail to load tasks', () => {
      spyOn(taskService, 'loadTasks').and.returnValue(
        new Observable((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = true;
          observer.next(result);
          observer.complete();
        })
      );
      component.loadTasks(new TaskFilterVO());
      expect(component.taskLoadError).toBe('We could not load any tasks.');
    });

    it('Should set component.tasks and taskModel.tasks when services are succesful', () => {
      // cheating when creating the results array by not populating objects
      let results : TaskVO[] = [new TaskVO(),new TaskVO(),new TaskVO()] ;

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
      expect(taskModel.tasks).toBe(results);
      expect(component.tasks).toBe(results);
      expect(component.tasks.length).toBe(3);
    });

  });

  describe('onEditTask()', () => {

    it('Should emit onEditTask when onEditTask() method is called', () => {
      spyOn(component.editTaskRequest,"emit")
      const task: TaskVO = Object.assign(new TaskVO(), {description: 'something'})
      component.onEditTask(task);
      expect(component.editTaskRequest.emit).toHaveBeenCalledWith(task);
    });
  });

  describe('onScheduleTaskRequest()', () => {

    it('Should Call taskmodel.onScheduleTaskRequest() when component.onScheduleTaskRequest is called', () => {
      spyOn(taskModel,"onScheduleTaskRequest")
      const task: TaskVO = Object.assign(new TaskVO(), {description: 'something'})
      component.onScheduleTaskRequest(task);
      expect(taskModel.onScheduleTaskRequest).toHaveBeenCalledWith(task);
    });
  });

  describe('onCompletedCheckBoxChange()', () => {

    it('Should set taskLoadError when service fails to mark task complete', () => {
      spyOn(taskService, 'completeTask').and.returnValue(
        new Observable((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = true;
          observer.next(result);
          observer.complete();
        })
      );
      component.onCompletedCheckBoxChange(new TaskVO());
      expect(component.taskLoadError).toBe('Error completing the task.');
    });

    it('Should call taskM<odel.replaceTask() after getting object back from service', () => {
      // cheating when creating the results array by not populating objects
      let results : TaskVO[] = [new TaskVO()] ;
      taskModel.tasks = [];
      spyOn(taskModel,"replaceTask");

      spyOn(taskService, 'completeTask').and.returnValue(
        new Observable((observer : Observer<ResultObjectVO>) => {
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
