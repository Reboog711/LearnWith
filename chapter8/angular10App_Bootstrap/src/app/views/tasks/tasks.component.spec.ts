import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbModal, NgbModalRef, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppComponent} from "../../app.component";
import {LoginComponent} from "../login/login.component";
import {TaskGridComponent} from "../task-grid/task-grid.component";
import {TaskFilterComponent} from "../task-filter/task-filter.component";
import {TaskCuComponent} from "../task-cu/task-cu.component";
import {TaskSchedulerComponent} from "../task-scheduler/task-scheduler.component";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthenticationService} from "../../services/mock/authentication.service";
import {TaskService} from "../../services/mock/task.service";

import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {TaskVO} from "../../vo/task-vo";

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let modalService: NgbModal;
  beforeEach(async(() => {
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
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ TaskCuComponent ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    modalService = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onToggleScheduler()', function() {

    it('Should set Scheduler State to True', function () {
      component.schedulerState = true;
      component.onToggleScheduler();
      expect(component.schedulerState).toBeFalsy();
      expect(component.gridContainerStyle).toBe('horizontal-layout-94');
      expect(component.schedulerShowButtonLabel).toBe('<');
    });
    it('Should set Scheduler State to False', function () {
      component.schedulerState = false;
      component.onToggleScheduler();
      expect(component.schedulerState).toBeTruthy();
      expect(component.gridContainerStyle).toBe('horizontal-layout-60');
      expect(component.schedulerShowButtonLabel).toBe('>');
    });
  });

  describe('openTaskWindow()', function() {
    it('should open Modal', function () {
      spyOn(modalService,"open").and.callThrough();
      component['openTaskWindow']("Test Title");
      expect(modalService.open).toHaveBeenCalled();
    });

  });

  describe('Modal Ref Processing', function() {
    let modalRef : NgbModalRef;
    beforeEach(() => {
      modalRef = modalService.open(TaskCuComponent );
      spyOn(modalService,"open").and.returnValue(modalRef);
    });
    it('Should set title and task on the open Modal', function () {
      component['openTaskWindow']("Test Title", null);
      expect(modalService.open).toHaveBeenCalled();
      expect(modalRef.componentInstance.title).toBe("Test Title");
      expect(modalRef.componentInstance.task).toBeNull();
    });
    it('Should open Modal with the Task Set', function () {
      const task = new TaskVO();
      component['openTaskWindow']("Test Title", task);
      expect(modalService.open).toHaveBeenCalled();
      expect(modalRef.componentInstance.title).toBe("Test Title");
      expect(modalRef.componentInstance.task).toBe(task);
    });

    it('Should open Modal, and pass new task when Closed', () => {
      debugger;
      component['openTaskWindow']("Test Title");
      let task : TaskVO[] = [Object.assign(new TaskVO(), { taskID : 700,description : "something"})];
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        modalRef.close(task);
        fixture.whenStable().then(() => {
          expect(fixture.componentInstance['taskgrid'].tasks.length).toBe(25);
          expect(fixture.componentInstance['taskgrid'].tasks[fixture.componentInstance['taskgrid'].tasks.length-1]).toBe(task[0]);
        });
      });
    });

    it('Should open modal and edit Existing Task', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let task : TaskVO = fixture.componentInstance['taskgrid'].tasks[fixture.componentInstance['taskgrid'].tasks.length-1];
        task.description = "Something Else";
        component['openTaskWindow']("Test Title", task);
        modalRef.close([task]);
        fixture.whenStable().then(() => {
          expect(fixture.componentInstance['taskgrid'].tasks.length).toBe(24);
          expect(fixture.componentInstance['taskgrid'].tasks[fixture.componentInstance['taskgrid'].tasks.length-1]).toBe(task);
          expect(fixture.componentInstance['taskgrid'].tasks[fixture.componentInstance['taskgrid'].tasks.length-1].description).toBe("Something Else");
        });
      });
    });

  });
});
