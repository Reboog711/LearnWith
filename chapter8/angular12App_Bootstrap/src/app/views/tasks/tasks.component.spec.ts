import {
  ComponentFixture, discardPeriodicTasks, fakeAsync,
  TestBed, tick,
  waitForAsync
} from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import {NgbModal, NgbModalRef, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {TaskGridComponent} from "../task-grid/task-grid.component";
import {TaskCuComponent} from "../task-cu/task-cu.component";
import {TaskVO} from "../../vo/task-vo";
import {createMockTaskArray, task1, task5} from "../../mock/tasks-mock";
import {Observable} from "rxjs";
import {TasksService} from "../../services/tasks.service";

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {userMock} from "../../mock/user-mock";
import {UserVO} from "../../vo/user-vo";
import { TaskFilterVO } from 'src/app/vo/task-filter-vo';
import Spy = jasmine.Spy;
import {TaskSchedulerComponent} from "../task-scheduler/task-scheduler.component";
import {DatatableComponent, NgxDatatableModule} from "@swimlane/ngx-datatable";


describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let modalService: NgbModal;

/*
  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [
        TasksComponent, TaskCuComponent, TaskGridComponent
      ],
      imports: [
        HttpClientTestingModule, FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));
*/

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [
        TasksComponent, TaskCuComponent, TaskGridComponent, TaskSchedulerComponent
      ],
      imports: [
        HttpClientTestingModule, FormsModule, NgbModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);

    const tasksService = TestBed.inject(TasksService);
    spyOn(tasksService, 'loadTasks').and.returnValue(new Observable());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.userModel.user = Object.assign(new UserVO(), userMock);
    })
    it ('should set the grid container style to horizontal layout 100 when the user is a creator role', () => {
      component.userModel.user.roleID = component.userModel.CREATOR_ROLE;
      fixture.detectChanges();
      expect(component.gridContainerStyle).toBe('horizontal-layout-100')
    })
    it ('should set the grid container style to horizontal layout 94 when the user is a taskor role', () => {
      component.userModel.user.roleID = component.userModel.TASKER_ROLE;
      fixture.detectChanges();
      expect(component.gridContainerStyle).toBe('horizontal-layout-94')
    })
  })

  describe('filterRequest()', () => {
    it('should call taskGrid to load tasks', () => {
      fixture.detectChanges();
      spyOn<any>(component['taskgrid'], 'loadTasks');
      const taskFilter = new TaskFilterVO();
      component.filterRequest(taskFilter);
      expect(component['taskgrid'].loadTasks).toHaveBeenCalledWith(taskFilter);
    })
  })

  describe('newTask()', () => {
    it('should call open task Window', () => {
      spyOn<any>(component, 'openTaskWindow');
      component.newTask();
      expect(component['openTaskWindow']).toHaveBeenCalledWith('Create a New Task');
    })
  })

  describe('editTask()', () => {
    it('should call open task Window', () => {
      const openTaskWindowSpy: Spy = spyOn<any>(component, 'openTaskWindow');
      const task = Object.assign({}, task5);
      component.editTask(task );
      expect(component['openTaskWindow']).toHaveBeenCalled();
      expect(openTaskWindowSpy.calls.argsFor(0)).toEqual(['Edit Task', task]);
    })
  })


  describe('openTaskWindow()', () => {
    beforeEach(() => {
      fixture.detectChanges();
    })
    it('should open Modal', () => {
      spyOn(modalService,"open").and.callThrough();
      component['openTaskWindow']("Test Title");
      expect(modalService.open).toHaveBeenCalled();
    });


    describe('Modal Ref Processing', () => {
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

      // todo these four approaches should be written about somehow
      it('Should open Modal, and pass new task when Closed using waitForAsync', waitForAsync (() => {

        component['openTaskWindow']("Test Title");
        let task : TaskVO = Object.assign(new TaskVO(), task5);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          spyOn(component['taskgrid'], 'refresh');
          modalRef.close(task);

          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component['taskgrid'].tasks.length).toBe(1);
            expect(component['taskgrid'].tasks[component['taskgrid'].tasks.length-1]).toEqual(task);
            expect(component['taskgrid'].refresh).toHaveBeenCalled();
          });
        })
      }));

      it('Should open Modal, and pass new task when Closed using doneFunction', (done) => {
        component['openTaskWindow']("Test Title");
        let task : TaskVO = Object.assign(new TaskVO(), task5);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          spyOn(component['taskgrid'], 'refresh');
          modalRef.close(task);

          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component['taskgrid'].tasks.length).toBe(1);
            expect(component['taskgrid'].tasks[component['taskgrid'].tasks.length-1]).toEqual(task);
            expect(component['taskgrid'].refresh).toHaveBeenCalled();
            done();
          });
        })
      });

      it('Should open Modal, and pass new task when Closed using async await', async() => {
        component['openTaskWindow']("Test Title");
        let task : TaskVO = Object.assign(new TaskVO(), task5);

        spyOn(component['taskgrid'], 'refresh');
        modalRef.close(task);

        fixture.detectChanges();
        await fixture.whenStable();

        expect(component['taskgrid'].tasks.length).toBe(1);
        expect(component['taskgrid'].tasks[component['taskgrid'].tasks.length-1]).toEqual(task);
        expect(component['taskgrid'].refresh).toHaveBeenCalled();
      });

      it('Should open Modal, and pass new task when Closed using fakeAsync', fakeAsync(() => {
        spyOn(component['taskgrid'], 'refresh');
        component['openTaskWindow']("Test Title");
        let task : TaskVO = Object.assign(new TaskVO(), task5);
        modalRef.close(task);
        tick();

        expect(component['taskgrid'].tasks.length).toBe(1);
        expect(component['taskgrid'].tasks[component['taskgrid'].tasks.length-1]).toEqual(task);
        expect(component['taskgrid'].refresh).toHaveBeenCalled();
        discardPeriodicTasks();
      }));
      // todo these four approaches should be written about somehow end

      it('Should open Modal and Edit Existing Task', waitForAsync(() => {
        component['taskgrid'].tasks = createMockTaskArray();
        let task : TaskVO = component['taskgrid'].tasks[component['taskgrid'].tasks.length-1];
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          task.description = "Something Else";
          component['openTaskWindow']("Test Title", task);
          modalRef.close(task);

          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component['taskgrid'].tasks.length).toBe(4);
            expect(component['taskgrid'].tasks[component['taskgrid'].tasks.length-1]).toBe(task);
            expect(component['taskgrid'].tasks[component['taskgrid'].tasks.length-1].description).toBe("Something Else");
          });
        });
      }));

      it('Should open Modal but make no changes on dismiss', waitForAsync(() => {
        const taskArray = createMockTaskArray()
        component['taskgrid'].tasks = taskArray;
        let task : TaskVO = Object.assign(new TaskVO(), task5);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          component['openTaskWindow']("Test Title", task);
          modalRef.dismiss();

          fixture.whenStable().then(() => {
            expect(component['taskgrid'].tasks).toEqual(taskArray);
          });
        });
      }));

    });
  });

});

// this is crazy and unusual, but if I add in the NgxDatatableModule to the main TestBed
// it causes with the asynchronous tests because there must be some interval used under the hood
// so separate out these test and test beds
describe('onToggleScheduler()', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [
        TasksComponent, TaskCuComponent, TaskGridComponent, TaskSchedulerComponent
      ],
      imports: [
        HttpClientTestingModule, FormsModule, NgbModule, NgxDatatableModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture.detectChanges();
    spyOn<any>(component['taskscheduler'], 'initialLoad');
    spyOn<any>(component['taskgrid'].taskGrid, 'recalculate');
  })

  it('Should set Scheduler State to True', () => {
    component.schedulerState = true;
    component.onToggleScheduler();
    expect(component.schedulerState).toBeFalsy();
    expect(component.gridContainerStyle).toBe('horizontal-layout-94');
    expect(component.schedulerShowButtonLabel).toBe('<');
    expect(component['taskscheduler'].initialLoad).not.toHaveBeenCalled();
  });
  it('Should set Scheduler State to False', () => {
    component.schedulerState = false;
    component.onToggleScheduler();
    expect(component.schedulerState).toBeTruthy();
    expect(component.gridContainerStyle).toBe('horizontal-layout-60');
    expect(component.schedulerShowButtonLabel).toBe('>');
    expect(component['taskscheduler'].initialLoad).toHaveBeenCalled();
  });


  it('should call taskgrid recalculate() after short delay', waitForAsync(() => {
    component.schedulerState = true;
    component.onToggleScheduler();
    expect(component.schedulerState).toBeFalsy();
    expect(component.gridContainerStyle).toBe('horizontal-layout-94');
    expect(component.schedulerShowButtonLabel).toBe('<');
    expect(component['taskscheduler'].initialLoad).not.toHaveBeenCalled();
    fixture.whenStable().then(() => {
      fixture.whenStable().then(() => {
        expect(component['taskgrid'].taskGrid.recalculate).toHaveBeenCalled();
      })
    })
  }));
});
