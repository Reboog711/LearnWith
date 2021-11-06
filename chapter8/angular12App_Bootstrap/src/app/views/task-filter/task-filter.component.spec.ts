import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFilterComponent } from './task-filter.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {RefDataModel} from "../../model/ref-data-model";
import {Observable, Observer} from "rxjs";
import {TaskCategoriesService} from "../../services/task-categories.service";
import {TaskCategoryVO} from "../../vo/task-category-vo";
import {TaskFilterVO} from "../../vo/task-filter-vo";

describe('TaskFilterComponent', () => {
  let component: TaskFilterComponent;
  let fixture: ComponentFixture<TaskFilterComponent>;
  let refDataModel: RefDataModel;
  let taskCategoriesService: TaskCategoriesService;

  beforeEach(async () => {
/*
    await TestBed.configureTestingModule({
      declarations: [ TaskFilterComponent ]
    })
*/
    await TestBed.configureTestingModule({
      declarations: [ TaskFilterComponent ],
      imports: [HttpClientTestingModule, NgbModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    refDataModel = TestBed.inject(RefDataModel);
    taskCategoriesService = TestBed.inject(TaskCategoriesService);
    fixture = TestBed.createComponent(TaskFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit FilterRequest', function () {
    spyOn(component.filterRequest,"emit")
    component.filter();
    expect(component.filterRequest.emit).toHaveBeenCalled();
  });

  it('should emit NewTask', function () {
    spyOn(component.newTaskRequest,"emit")
    component.newTask();
    expect(component.newTaskRequest.emit).toHaveBeenCalled();
  });

  describe('loadTaskCategories()', () => {
    let loadTaskCategoriesObserver: Observer<TaskCategoryVO[]>;

    beforeEach(() => {
      const loadTaskCategoriesObservable: Observable<TaskCategoryVO[]> = new Observable((observer) => {
        loadTaskCategoriesObserver = observer;
      })
      spyOn(taskCategoriesService, 'loadTaskCategories').and.returnValue(loadTaskCategoriesObservable)
    })

    it('should set filterError value when error occurs', () => {
      component.loadTaskCategories();
      loadTaskCategoriesObserver.error({});
      expect(component.filterError).toBe('There was a task category service error');
    })

    it('should load task categories, save them to the refDataModel and add all Categories object to local categories array', () => {
      const taskCategoryArray: TaskCategoryVO[] = [new TaskCategoryVO(), new TaskCategoryVO() ]
      const allTask: TaskCategoryVO = Object.assign(new TaskCategoryVO(), {
        taskCategoryID: 0,
        taskCategory: 'All Categories'
      });
      const allTaskCategoriesArray = [...[allTask], ...taskCategoryArray]

      component.loadTaskCategories();
      loadTaskCategoriesObserver.next(taskCategoryArray);
      expect(refDataModel.taskCategories).toEqual(taskCategoryArray);
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
      component.completed = 'true';
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        startDateAsUTCString: null,
        endDateAsUTCString: null,
        scheduledStartDateAsUTCString: null,
        scheduledEndDateAsUTCString: null,
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
        startDateAsUTCString: new Date(2020, 10, 15, 0, 0, 0).toISOString(),
        endDateAsUTCString: new Date(2020, 10, 20, 0, 0, 0).toISOString(),
        scheduledStartDateAsUTCString: new Date(2020, 10, 21, 0, 0, 0).toISOString(),
        scheduledEndDateAsUTCString: new Date(2020, 10, 25, 0, 0, 0).toISOString(),
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
        startDateAsUTCString: null,
        endDateAsUTCString: null,
        scheduledStartDateAsUTCString: null,
        scheduledEndDateAsUTCString: null,
        completed: false,
        taskCategoryID: 0,
      });
      component.filter();
      expect(component.filterRequest.emit).toHaveBeenCalled();
      expect(filterRequestEmitSpy.calls.allArgs()[0]).toEqual([taskFilter])
    });
  });

});
