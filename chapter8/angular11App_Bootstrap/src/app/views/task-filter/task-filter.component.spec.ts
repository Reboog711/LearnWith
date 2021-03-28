import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFilterComponent } from './task-filter.component';
import {AppComponent} from "../../app.component";
import {LoginComponent} from "../login/login.component";
import {TasksComponent} from "../tasks/tasks.component";
import {TaskGridComponent} from "../task-grid/task-grid.component";
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
import {ResultObjectVO} from "../../vo/result-object-vo";
import {Observable, Observer} from "rxjs";
import {TaskCategoryVO} from "../../vo/task-category-vo";
import {TaskFilterVO} from "../../vo/task-filter-vo";

describe('TaskFilterComponent', () => {
  let component: TaskFilterComponent;
  let fixture: ComponentFixture<TaskFilterComponent>;
  let taskService: TaskService;

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
    fixture = TestBed.createComponent(TaskFilterComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
//    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadTaskCategories()', () => {
    let loadTaskObserver: Observer<ResultObjectVO>;

    beforeEach(() => {
      spyOn(taskService, 'loadTaskCategories').and.returnValue(new Observable((observer) => {
        loadTaskObserver = observer;
      }))
    })

    it('should set filterError value when error occurs', () => {
      component.loadTaskCategories();
      loadTaskObserver.error({});
      expect(component.filterError).toBe('There was a task category service error');
    })

    it('should set filterError value when server results return error', () => {
      component.loadTaskCategories();
      loadTaskObserver.next(Object.assign(new ResultObjectVO(), {error: true}));
      expect(component.filterError).toBe('Error loading task Categories');
    })

    it('should handle success state', () => {
      const taskCategoryArray: TaskCategoryVO[] = [new TaskCategoryVO(), new TaskCategoryVO() ]
      const allTask: TaskCategoryVO = Object.assign(new TaskCategoryVO(), {
        taskCategoryID: 0,
        taskCategory: 'All Categories'
      });
      const allTaskCategoriesArray = Object.assign( [], taskCategoryArray );
      allTaskCategoriesArray.unshift(allTask);

      component.loadTaskCategories();
      loadTaskObserver.next(Object.assign(new ResultObjectVO(), {error: false, resultObject: taskCategoryArray}));
      expect(component.taskModel.taskCategories).toEqual(taskCategoryArray);
      expect(component.taskCategories).toEqual(allTaskCategoriesArray);
      expect(component.taskFilter.taskCategoryID).toBe(0);
    })

  });

  describe('filter()', () => {
    let filterRequestEmitSpy: any;
    beforeEach(() => {
      filterRequestEmitSpy = spyOn(component.filterRequest,"emit");
    })

    it('should emit FilterRequest', () => {
      component.taskFilter.taskCategoryID = 0;
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        startDate: null,
        endDate: null,
        scheduledStartDate: null,
        scheduledEndDate: null,
        completed: true,
        taskCategoryID: 0,
      });
      component.filter();
      expect(component.filterRequest.emit).toHaveBeenCalled();
      expect(filterRequestEmitSpy.calls.allArgs()[0]).toEqual([taskFilter])
    });

    it('should emit FilterRequest with all dates', () => {
      component.taskFilter.taskCategoryID = 0;
      component.startDate = {year: 2020, month: 11, day: 15};
      component.endDate = {year: 2020, month: 11, day: 20};
      component.scheduledStartDate = {year: 2020, month: 11, day: 21};
      component.scheduledEndDate = {year: 2020, month: 11, day: 25};
      component.completed = 'null'
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        startDate: new Date(2020, 10, 15),
        endDate: new Date(2020, 10, 20),
        scheduledStartDate: new Date(2020, 10, 21),
        scheduledEndDate: new Date(2020, 10, 25),
        completed: null,
        taskCategoryID: 0,
      });
      component.filter();
      expect(component.filterRequest.emit).toHaveBeenCalled();
      expect(filterRequestEmitSpy.calls.allArgs()[0]).toEqual([taskFilter])
    });

    it('should emit FilterRequest with a false completed', () => {
      component.taskFilter.taskCategoryID = 0;
      component.completed = 'false';
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        startDate: null,
        endDate: null,
        scheduledStartDate: null,
        scheduledEndDate: null,
        completed: false,
        taskCategoryID: 0,
      });
      component.filter();
      expect(component.filterRequest.emit).toHaveBeenCalled();
      expect(filterRequestEmitSpy.calls.allArgs()[0]).toEqual([taskFilter])
    });
  });

  describe('newTask()', () => {
    it('should emit NewTask', () => {
      spyOn(component.newTaskRequest,"emit")
      component.newTask();
      expect(component.newTaskRequest.emit).toHaveBeenCalled();
    });
  });
});
