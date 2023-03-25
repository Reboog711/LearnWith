import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import {environment} from "../../environments/environment";
import {TaskVO} from "../vo/task-vo";
import {createMockTaskArray} from "../mock/tasks-mock";
import {ScheduleTaskBodyVO} from "../vo/schedule-task-body-vo";
import {TaskFilterVO} from "../vo/task-filter-vo";

describe('TasksService', () => {
  let service: TasksService;
  let httpMock : HttpTestingController;
  let taskMockAsJSON: any;

  beforeEach(() => {
    environment.mockData = false;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);
    taskMockAsJSON = {userID: 1, taskID: 1, description: 'something', completed: false}
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadTasks()', () => {
    it('should relay to mock service', () => {
      const taskFilter: TaskFilterVO = new TaskFilterVO();
      spyOn(service['tasksServiceMock'], 'loadTasks');
      environment.mockData = true;
      service.loadTasks(taskFilter);
      expect(service['tasksServiceMock'].loadTasks).toHaveBeenCalledWith(taskFilter);
    })

    it('Should load tasks with empty taskFilter', () => {
      let urlString = `${service['document'].location.origin}/tasks`

      // no pipe so we don't have to add assertions when process results here
      service.loadTasks(new TaskFilterVO()).subscribe((result) => {
        expect(result[0] instanceof TaskVO).toBeTruthy();
      })
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('GET');
      req.flush([taskMockAsJSON]);
    });

    it('Should load tasks with full taskFilter', () => {
      let urlString = `${service['document'].location.origin}/tasks?completed=true&startDateAsUTCString=2020-11-20T05%3A00%3A00.000Z&endDateAsUTCString=2020-11-20T05%3A00%3A00.000Z&scheduledStartDateAsUTCString=2020-11-20T05%3A00%3A00.000Z&scheduledEndDateAsUTCString=2020-11-20T05%3A00%3A00.000Z&scheduledEqualDateAsUTCString=2020-11-20T05%3A00%3A00.000Z&taskCategoryID=1`
      const taskFilter = Object.assign(new TaskFilterVO(), {
        completed: true,
        startDateAsUTCString: new Date(2020, 10, 20, 0, 0, 0).toISOString(),
        endDateAsUTCString: new Date(2020, 10, 20, 0, 0, 0).toISOString(),
        scheduledStartDateAsUTCString: new Date(2020, 10, 20, 0, 0, 0).toISOString(),
        scheduledEndDateAsUTCString: new Date(2020, 10, 20, 0, 0, 0).toISOString(),
        scheduledEqualDateAsUTCString: new Date(2020, 10, 20, 0, 0, 0).toISOString(),
        taskCategoryID: 1
      })

      // no pipe so we don't have to add assertions when process results here
      service.loadTasks(taskFilter).subscribe((result) => {
        expect(result[0] instanceof TaskVO).toBeTruthy();
      })
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('GET');
      req.flush([taskMockAsJSON]);
    });

    it('Should load tasks that are not completed', () => {
      let urlString = `${service['document'].location.origin}/tasks?completed=false`
      const taskFilter = Object.assign(new TaskFilterVO(), {
        completed: false
      })

      // no pipe so we don't have to add assertions when process results here
      service.loadTasks(taskFilter).subscribe((result) => {
        expect(result[0] instanceof TaskVO).toBeTruthy();
      })
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('GET');
      req.flush([taskMockAsJSON]);
    });

  });

  describe('scheduleTaskList()', () => {
    it('should relay to mock service', () => {
      const tasks: TaskVO[] = [];
      spyOn(service['tasksServiceMock'], 'scheduleTaskList');
      environment.mockData = true;
      service.scheduleTaskList(tasks);
      expect(service['tasksServiceMock'].scheduleTaskList).toHaveBeenCalledWith(tasks, undefined);
    })


    it('Should schedule task list with  specified date', () => {
      const urlString = 'tasks/datescheduled'
      const tasks: TaskVO[] = createMockTaskArray();
      const dateAsUTCString = new Date().toISOString();

      // no pipe so we don't have to add assertions when process results here
      service.scheduleTaskList(tasks, dateAsUTCString).subscribe()
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('PUT');
      let body: ScheduleTaskBodyVO = Object.assign(new ScheduleTaskBodyVO(), {
        taskIDList : `${tasks[0].taskID},${tasks[1].taskID},${tasks[2].taskID},${tasks[3].taskID}`,
        dateScheduledAsUTCString :  dateAsUTCString
      })
      expect(req.request.body).toEqual(body);
      req.flush({});
    });

    it('Should schedule task list with  no specified date', () => {
      const urlString = 'tasks/datescheduled'
      const tasks: TaskVO[] = createMockTaskArray();

      // no pipe so we don't have to add assertions when process results here
      service.scheduleTaskList(tasks).subscribe()
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('PUT');
      let body: ScheduleTaskBodyVO = Object.assign(new ScheduleTaskBodyVO(), {
        taskIDList : `${tasks[0].taskID},${tasks[1].taskID},${tasks[2].taskID},${tasks[3].taskID}`
      })
      expect(req.request.body).toEqual(body);
      req.flush({});
    });

  });


  afterEach(() => {
    httpMock.verify();
  });
});
