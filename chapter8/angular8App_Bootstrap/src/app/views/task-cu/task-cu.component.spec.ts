import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCuComponent } from './task-cu.component';
import {AppComponent} from "../../app.component";
import {LoginComponent} from "../login/login.component";
import {TasksComponent} from "../tasks/tasks.component";
import {TaskGridComponent} from "../task-grid/task-grid.component";
import {TaskFilterComponent} from "../task-filter/task-filter.component";
import {TaskSchedulerComponent} from "../task-scheduler/task-scheduler.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbActiveModal, NgbModal, NgbModalRef, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthenticationService} from "../../services/mock/authentication.service";
import {TaskService} from "../../services/mock/task.service";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {ResultObjectVO} from "../../../../../task-manager-bak/app/vo/result-object-vo";
import {TaskVO} from "../../../../../task-manager-bak/app/vo/task-vo";
import {Observable, Observer} from "rxjs";

describe('TaskCuComponent', () => {
  let component: TaskCuComponent;
  let fixture: ComponentFixture<TaskCuComponent>;
  let taskService : TaskService;
  let modalService: NgbModal;

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
        TaskService,
        NgbActiveModal
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ TaskCuComponent ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    taskService = TestBed.get(TaskService);
    modalService = TestBed.get(NgbModal);
    const modalRef : NgbModalRef = modalService.open(TaskCuComponent);
    component = modalRef.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSave()', function() {
    it('Failure', function () {
      spyOn(taskService, 'updateTask').and.returnValue(
        Observable.create((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = true;
          observer.next(result);
          observer.complete();
        })
      );
      component.onSave();
      expect(component.taskUpdateError).toBe('There was a problem saving the task.');
    });

    it('Success', function () {
      spyOn(taskService, 'updateTask').and.returnValue(
        Observable.create((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = false;
          result.resultObject = new TaskVO();
          observer.next(result);
          observer.complete();
        })
      );
      component.onSave();
      expect(component.taskUpdateError).toBe('');
    });

    it('Rejection', function () {
      spyOn(taskService, 'updateTask').and.returnValue(
        Observable.create((observer : Observer<ResultObjectVO>) => {
          observer.error({});
          observer.complete();
        })
      );
      component.onSave();
      expect(component.taskUpdateError).toBe('There was a problem saving the task.');
    });

  });
});
