import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGridComponent } from './task-grid.component';
import {Observable, Observer} from "rxjs";
import {TaskVO} from "../../vo/task-vo";
import {createMockTaskArray, task5} from "../../mock/tasks-mock";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TaskService} from "../../services/task.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TasksService} from "../../services/tasks.service";

describe('TaskGridComponent', () => {
  let component: TaskGridComponent;
  let fixture: ComponentFixture<TaskGridComponent>;
  let tasksService: TasksService;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskGridComponent ],
      imports: [HttpClientTestingModule, NgxDatatableModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskGridComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService);
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('loadTasks()', () => {
    let loadTasksObserver: Observer<any>;

    beforeEach(() => {
      spyOn(tasksService, 'loadTasks').and.returnValue(
        new Observable((observer ) => {
          loadTasksObserver = observer;
        })
      );
    })

    it('Should set taskLoadError when services fail to load tasks', () => {
      component.loadTasks(new TaskFilterVO());
      loadTasksObserver.error({});
      expect(component.taskLoadError).toBe('We had an error loading tasks.');
    });

    it('Should set component.tasks and taskModel.tasks when services are succesful', () => {
      // cheating when creating the results array by not populating objects
      let results : TaskVO[] = createMockTaskArray() ;

      component.loadTasks(new TaskFilterVO());
      loadTasksObserver.next(results);

      expect(component['taskModel'].tasks).toBe(results);
      expect(component.tasks).toEqual(results);
      expect(component.tasks.length).toBe(4
      );
    });

  });

  describe('onEditTask()', () => {

    it('Should emit onEditTask when onEditTask() method is called', () => {
      spyOn(component.editTaskRequest,"emit")
      const task: TaskVO = Object.assign(new TaskVO(), task5)
      component.onEditTask(task);
      expect(component.editTaskRequest.emit).toHaveBeenCalledWith(task);
    });
  });

  describe('refresh()', () => {

    it('Should change tasks based on taskModel.task', () => {
      component['taskModel'].tasks = createMockTaskArray();
      component.tasks = [];
      component.refresh();
      expect(component.tasks).toEqual(component['taskModel'].tasks);
    });
  });

  describe('onScheduleTaskRequest()', () => {

    it('Should Call taskmodel.onScheduleTaskRequest() when component.onScheduleTaskRequest is called', () => {
      spyOn(component['taskModel'],"onScheduleTaskRequest")
      const task: TaskVO = Object.assign(new TaskVO(), task5)
      component.onScheduleTaskRequest(task);
      expect(component['taskModel'].onScheduleTaskRequest).toHaveBeenCalledWith(task);
    });
  });
  describe('onCompletedCheckBoxChange()', () => {
    let completeTaskObserver: Observer<any>;
    beforeEach(() => {
      spyOn(taskService, 'completeTask').and.returnValue(
        new Observable((observer ) => {
          completeTaskObserver = observer;
        })
      );
    })

    it('Should set taskLoadError when service fails to mark task complete', () => {
      component.onCompletedCheckBoxChange(new TaskVO());
      completeTaskObserver.error({});
      expect(component.taskLoadError).toBe('Error completing the task.');
    });

    it('Should call taskM<odel.replaceTask() after getting object back from service', () => {
      // cheating when creating the results array by not populating objects
      const result : TaskVO = new TaskVO() ;
      component['taskModel'].tasks = [];
      spyOn(component['taskModel'],"replaceTask");
      spyOn(component, 'refresh');

      component.onCompletedCheckBoxChange(result);
      completeTaskObserver.next(result);
      expect(component['taskModel'].replaceTask).toHaveBeenCalledWith(result);
      expect(component.refresh).toHaveBeenCalled();
    });
  });

});
