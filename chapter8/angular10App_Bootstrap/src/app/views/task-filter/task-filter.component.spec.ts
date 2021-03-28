import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFilterComponent } from './task-filter.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppComponent} from "../../app.component";
import {LoginComponent} from "../login/login.component";
import {TasksComponent} from "../tasks/tasks.component";
import {TaskGridComponent} from "../task-grid/task-grid.component";
import {TaskCuComponent} from "../task-cu/task-cu.component";
import {TaskSchedulerComponent} from "../task-scheduler/task-scheduler.component";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthenticationService} from "../../services/mock/authentication.service";
import {TaskService} from "../../services/mock/task.service";

describe('TaskFilterComponent', () => {
  let component: TaskFilterComponent;
  let fixture: ComponentFixture<TaskFilterComponent>;

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
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('filter()', function() {
    it('Emit FilterRequest', function () {
      spyOn(component.filterRequest,"emit")
      component.filter();
      expect(component.filterRequest.emit).toHaveBeenCalled();
    });
  });
  describe('newTask()', function() {
    it('Emit NewTask', function () {
      spyOn(component.newTaskRequest,"emit")
      component.newTask();
      expect(component.newTaskRequest.emit).toHaveBeenCalled();
    });
  });
});
