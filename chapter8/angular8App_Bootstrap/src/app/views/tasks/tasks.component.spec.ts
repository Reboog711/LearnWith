import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import {AppComponent} from "../../app.component";
import {LoginComponent} from "../login/login.component";
import {TaskGridComponent} from "../task-grid/task-grid.component";
import {TaskFilterComponent} from "../task-filter/task-filter.component";
import {TaskCuComponent} from "../task-cu/task-cu.component";
import {TaskSchedulerComponent} from "../task-scheduler/task-scheduler.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbModal, NgbModalRef, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthenticationService} from "../../services/mock/authentication.service";
import {TaskService} from "../../services/mock/task.service";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {TaskVO} from "../../../../../task-manager-bak/app/vo/task-vo";

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
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

    it('Scheduler State True', function () {
      component.schedulerState = true;
      component.onToggleScheduler();
      expect(component.schedulerState).toBeFalsy();
      expect(component.gridContainerStyle).toBe('horizontal-layout-94');
      expect(component.schedulerShowButtonLabel).toBe('<');
    });
    it('Scheduler State False', function () {
      component.schedulerState = false;
      component.onToggleScheduler();
      expect(component.schedulerState).toBeTruthy();
      expect(component.gridContainerStyle).toBe('horizontal-layout-60');
      expect(component.schedulerShowButtonLabel).toBe('>');
    });
  });

  describe('openTaskWindow()', function() {

    it('Modal Opened', function () {
      spyOn(modalService,"open").and.callThrough();
      component['openTaskWindow']("Test Title");
      expect(modalService.open).toHaveBeenCalled();
    });

    describe('Modal Ref Processing', function() {
      let modalRef : NgbModalRef;
      let task : TaskVO;
      beforeEach(() => {
        modalRef = modalService.open(TaskCuComponent );
        spyOn(modalService,"open").and.returnValue(modalRef);
      });


      it('Modal Opened, Title Set, no Task', function () {
        component['openTaskWindow']("Test Title", null);
        expect(modalService.open).toHaveBeenCalled();
        expect(modalRef.componentInstance.title).toBe("Test Title");
        expect(modalRef.componentInstance.task).toBeNull();
      });

      it('Modal Opened, Task Set', function () {
        task = new TaskVO();
        component['openTaskWindow']("Test Title", task);
        expect(modalService.open).toHaveBeenCalled();
        expect(modalRef.componentInstance.title).toBe("Test Title");
        expect(modalRef.componentInstance.task).toBe(task);
      });

      xit('Modal Opened, Closed with New Task', (done : DoneFn) => {
        component['openTaskWindow']("Test Title");
        let task : TaskVO[] = [{ taskID : 700,description : "something"} as TaskVO];

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          modalRef.close(task);
          // second fixture runs the modalRef.close()
          fixture.whenStable().then(() => {
            expect(fixture.componentInstance['taskgrid'].tasks.length).toBe(25);
            expect(fixture.componentInstance['taskgrid'].tasks[fixture.componentInstance['taskgrid'].tasks.length-1]).toBe(task[0]);
            done();
          });
        });
      });

      xit('Modal Opened, Edit Existing Task', (done : DoneFn) => {

        // first fixture.whenStable() for loading tasks
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          let task : TaskVO = fixture.componentInstance['taskgrid'].tasks[fixture.componentInstance['taskgrid'].tasks.length-1] as TaskVO;
          task.description = "Something Else";
          component['openTaskWindow']("Test Title", task);
          modalRef.close(task);
          // second fixture runs the modalRef.close()
          fixture.whenStable().then(() => {
            expect(fixture.componentInstance['taskgrid'].tasks.length).toBe(24);
            expect(fixture.componentInstance['taskgrid'].tasks[fixture.componentInstance['taskgrid'].tasks.length-1]).toBe(task);
            expect(fixture.componentInstance['taskgrid'].tasks[fixture.componentInstance['taskgrid'].tasks.length-1].description).toBe("Something Else");
            done();
          });
        });
      });


    });
  });
});
