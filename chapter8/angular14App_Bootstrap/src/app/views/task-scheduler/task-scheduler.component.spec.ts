import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Observable, Observer} from 'rxjs';

import { TaskSchedulerComponent } from './task-scheduler.component';
import Spy = jasmine.Spy;
import {createMockTaskArray, task1, task2, task3, task4, task5} from "../../mock/tasks-mock";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TaskVO} from "../../vo/task-vo";
import {NgbDateStruct, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TasksService} from "../../services/tasks.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";

describe('TaskSchedulerComponent', () => {
  let component: TaskSchedulerComponent;
  let fixture: ComponentFixture<TaskSchedulerComponent>;
  let tasksService: TasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskSchedulerComponent ],
      imports: [HttpClientTestingModule, NgbModule, FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    tasksService = TestBed.inject(TasksService);
    fixture = TestBed.createComponent(TaskSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('onScheduleDateChange()', () => {
    let loadTasksSpy: Spy ;
    beforeEach(() => {
      loadTasksSpy = spyOn(component,"loadTasks")
    })

    it('Should call loadTasks() when the scheduler date changes', () => {
      component.schedulerDate = ({year:2021,day:20, month:10 }) as NgbDateStruct;
      component.onScheduleDateChange();
      expect(component.loadTasks).toHaveBeenCalled();
      const expectedTaskFilter = Object.assign(new TaskFilterVO(), {
        scheduledEqualDateAsUTCString: '2021-10-20T04:00:00.000Z'
      })
      expect(loadTasksSpy.calls.argsFor(0)).toEqual([expectedTaskFilter])
    });
    it('Should not call loadTasks() if SchedulerDate does not change', () => {
      component.schedulerDate = {} as NgbDateStruct;
      component.onScheduleDateChange();
      expect(component.loadTasks).not.toHaveBeenCalled();
    });
  })

  describe('onTaskUnschedule()', () => {
    let scheduleTasksObserver: Observer<any>;
    beforeEach(() => {
      spyOn(component,"scheduleTasks").and.returnValue(new Observable<any>((observer) => {
        scheduleTasksObserver = observer;
      }))
      spyOn(component, 'deleteTaskFromSchedule');
    })
    it('Should call deleteTaskFromSchedule() on success result from scheduleTasks()', () => {
      let task : TaskVO  = Object.assign(new TaskVO(), task5);
      task.dateScheduledAsUTCString = new Date().toISOString();
      component.onTaskUnschedule(task);
      expect(component.scheduleTasks).toHaveBeenCalledWith([task]);
      scheduleTasksObserver.next({});
      expect(component.deleteTaskFromSchedule).toHaveBeenCalledWith(task);
    });
    it('Should set schedulerError when scheduleTasks() fails', () => {
      let task : TaskVO  = Object.assign(new TaskVO(), task5);
      task.dateScheduledAsUTCString = new Date().toISOString();
      component.onTaskUnschedule(task);
      expect(component.scheduleTasks).toHaveBeenCalledWith([task]);
      scheduleTasksObserver.error({});
      expect(component.schedulerError).toBe('We had an error scheduling the tasks.');
    });
    it('Should call deleteTaskFromSchedule() when no dateScheduledAsUTCString on task object', () => {
      let task : TaskVO  = Object.assign(new TaskVO(), task5);
      component.onTaskUnschedule(task);
      expect(component.deleteTaskFromSchedule).toHaveBeenCalledWith(task);
    });
  });

  describe('deleteTaskFromSchedule()', () => {

    it('Should Remove Task from ScheduledTasks, but not AddedTasks', () => {
      let task : TaskVO = new TaskVO();
      component.taskModel.scheduledTasks = [task,new TaskVO(),new TaskVO()]
      let oldScheduledTasksLength : Number = component.taskModel.scheduledTasks.length;
      component.taskModel.addedTasks = [new TaskVO(),new TaskVO()]
      let oldAddedModelLength : Number = component.taskModel.addedTasks.length;

      component.deleteTaskFromSchedule(task);
      let newScheduledTasksLength : Number = component.taskModel.scheduledTasks.length+1;
      let newAddedModelLength : Number = component.taskModel.addedTasks.length;

      expect(oldScheduledTasksLength).toBe(newScheduledTasksLength);
      expect(oldAddedModelLength).toBe(newAddedModelLength);
    });

    it('Should Remove Task from AddedTasks, but not ScheduledTasks', () => {
      let task : TaskVO = new TaskVO();
      component.taskModel.scheduledTasks = [new TaskVO(),new TaskVO()]
      let oldScheduledTasksLength : Number = component.taskModel.scheduledTasks.length;
      component.taskModel.addedTasks = [task,new TaskVO(),new TaskVO()]
      let oldAddedModelLength : Number = component.taskModel.addedTasks.length;

      component.deleteTaskFromSchedule(task);
      let newScheduledTasksLength : Number = component.taskModel.scheduledTasks.length;
      let newAddedModelLength : Number = component.taskModel.addedTasks.length+1;

      expect(oldScheduledTasksLength).toBe(newScheduledTasksLength);
      expect(oldAddedModelLength).toBe(newAddedModelLength);
    });

    it('Should Remove Task From ScheduledTasks and addedTasks', () => {
      let task : TaskVO = new TaskVO();
      component.taskModel.scheduledTasks = [task,new TaskVO(),new TaskVO()]
      let oldScheduledTasksLength : Number = component.taskModel.scheduledTasks.length;
      component.taskModel.addedTasks = [new TaskVO(),new TaskVO(),task]
      let oldAddedModelLength : Number = component.taskModel.addedTasks.length;

      component.deleteTaskFromSchedule(task);
      let newScheduledTasksLength : Number = component.taskModel.scheduledTasks.length+1;
      let newAddedModelLength : Number = component.taskModel.addedTasks.length+1;

      expect(oldScheduledTasksLength).toBe(newScheduledTasksLength);
      expect(oldAddedModelLength).toBe(newAddedModelLength);
    });
  });

  describe('scheduleTasks()', () => {

    let scheduledTaskListObserver: Observer<any>;
    beforeEach(() => {
      spyOn(tasksService, 'scheduleTaskList').and.returnValue(
        new Observable((observer : Observer<any>) => {
          scheduledTaskListObserver = observer;
        })
      );
    })

    it('Should null the dateScheduled property on the selected task', () => {
      component.taskModel.tasks = component.taskModel.scheduledTasks = createMockTaskArray();
      let task: TaskVO = Object.assign(new TaskVO(), component.taskModel.tasks[2]);
      task.dateScheduledAsUTCString = new Date().toISOString();
      component.scheduleTasks([task]).subscribe();
      scheduledTaskListObserver.next({});
      expect(component.taskModel.tasks[2].dateScheduledAsUTCString).toBeFalsy();
    });

    it('Should set the dateScheduled property on the selected task', () => {
      component.taskModel.tasks = component.taskModel.scheduledTasks = createMockTaskArray();
      let task: TaskVO = Object.assign(new TaskVO(), component.taskModel.tasks[1]);
      task.dateScheduledAsUTCString = new Date().toISOString();
      const otherDateISOString = new Date(2021, 10, 20).toISOString();

      component.scheduleTasks([task], otherDateISOString).subscribe();
      scheduledTaskListObserver.next({});
      expect(component.taskModel.tasks[1].dateScheduledAsUTCString).toBe(otherDateISOString);
    });

  });

  describe('loadTasks()', () => {
    let loadTaskObserver: Observer<any>;
    beforeEach(() => {
      spyOn(tasksService, 'loadTasks').and.returnValue(new Observable((observer) => {
        loadTaskObserver = observer;
      }));
    })
    it('should set schedulerError when task loading fails', () => {
      component.loadTasks(new TaskFilterVO());
      loadTaskObserver.error({});
      expect(component.schedulerError).toBe('We had an error loading tasks.');
    })

    it('should set results to scheduledTasks and concat addedTasks when task loading suceeds', () => {
      const results = [Object.assign(new TaskVO(), task1), Object.assign(new TaskVO(), task3)];
      component.taskModel.scheduledTasks = [];
      component.taskModel.addedTasks = [Object.assign(new TaskVO(), task2), Object.assign(new TaskVO(), task4)]
      component.loadTasks(new TaskFilterVO());
      loadTaskObserver.next(results);
      expect(component.schedulerError).toBe('');
      expect(component.taskModel.scheduledTasks).toEqual([task1, task3, task2, task4 ])
    })

  })

  describe('initialLoad()', () => {
    it('should call load Tasks with task filter made from schedulerDate', () => {
      const loadTaskSpy: Spy = spyOn(component, 'loadTasks');
      const schedulerDate: Date = new Date();
      const taskFilter: TaskFilterVO = Object.assign(new TaskFilterVO(), {
        scheduledEqualDateAsUTCString: schedulerDate.toISOString()
      })
      component.initialLoad(schedulerDate);
      expect(component.loadTasks).toHaveBeenCalled();
      expect(loadTaskSpy.calls.argsFor(0)).toEqual([taskFilter]);
      expect(component.schedulerDate).toEqual({
        day: schedulerDate.getUTCDate(),
        month: schedulerDate.getUTCMonth() +1,
        year: schedulerDate.getUTCFullYear()
      })
    })
  })

  describe('onTaskListSchedule()', () => {
    let scheduleTaskObserver: Observer<any>;
    let scheduleTasksSpy: Spy;
    let schedulerDateAsUTCString: string;
    beforeEach(() => {
      scheduleTasksSpy = spyOn(component, 'scheduleTasks').and.returnValue(new Observable((observer) => {
        scheduleTaskObserver = observer;
      }))
      component.schedulerDate = {
        year: 2021, month: 11, day: 20
      }
      schedulerDateAsUTCString = new Date(component.schedulerDate.year,
        component.schedulerDate.month-1,
        component.schedulerDate.day).toISOString()
    })

    it('should set schedulerError when failing scheduled task', () => {
      component.onTaskListSchedule();
      expect(component.scheduleTasks).toHaveBeenCalled();
      expect(scheduleTasksSpy.calls.argsFor(0)).toEqual([component.taskModel.scheduledTasks, schedulerDateAsUTCString])
      scheduleTaskObserver.error({});
      expect(component.schedulerError).toBe('We had an error scheduling all the tasks.');
    })

    it('should clear addedTasks on scheduled task success ', () => {
      component.taskModel.addedTasks = createMockTaskArray();
      component.onTaskListSchedule();
      expect(component.scheduleTasks).toHaveBeenCalled();
      expect(scheduleTasksSpy.calls.argsFor(0)).toEqual([component.taskModel.scheduledTasks, schedulerDateAsUTCString])
      scheduleTaskObserver.next({});
      expect(component.taskModel.addedTasks).toEqual([]);

    })

  })

});
