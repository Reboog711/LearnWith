import { async, TestBed,ComponentFixture } from '@angular/core/testing';
import {TaskScheduler} from "../../../../../../src/com/dotComIt/learnWith/views/tasks/taskscheduler.component";
import {TaskModel} from "../../../../../../src/com/dotComIt/learnWith/model/taskmodel";
import {TaskService} from "../../../../../../src/com/dotComIt/learnWith/services/mock/task.service";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {ResultObjectVO} from "../../../../../../src/com/dotComIt/learnWith/vo/ResultObjectVO";
import {TaskFilterVO} from "../../../../../../src/com/dotComIt/learnWith/vo/TaskFilterVO";
import {TaskVO} from "../../../../../../src/com/dotComIt/learnWith/vo/TaskVO";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";


describe('Task Scheduler Component', function () {
    let fixture: ComponentFixture<TaskScheduler>;
    let comp: TaskScheduler;
    let taskService: TaskService;
    let taskModel: TaskModel;

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TaskScheduler);
            taskService = TestBed.get(TaskService);
            taskModel = TestBed.get(TaskModel);
            comp = fixture.componentInstance;
        });
    }));

    describe('initialLoad()', function() {

        it('Call InitialLoad()', function () {
            spyOn(comp,"loadTasks")
            let date : Date = new Date();
            comp.initialLoad(date);
            expect(comp.loadTasks).toHaveBeenCalled();
        });
    });

    describe('loadTasks()', function() {

        it('Failure', function () {
            spyOn(taskService, 'loadTasks').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = true;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.loadTasks(new TaskFilterVO());
            expect(comp.schedulerError).toBe('We could not load any tasks.');
        });

        it('Success No Added Tasks', function () {
            // cheating when creating the results array by not populating objects
            let results : TaskVO[] = [new TaskVO(),new TaskVO(),new TaskVO()] ;
            taskModel.addedTasks = [];
            spyOn(taskService, 'loadTasks').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = false;
                    result.resultObject = results;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.loadTasks(new TaskFilterVO());
            // I think the concat makes the arrays no longer the same object, so toBe was failing
            expect(taskModel.scheduledTasks[0]).toBe(results[0]);
            expect(taskModel.scheduledTasks.length).toBe(3);
        });
        it('Success With Added Tasks', function () {
            // cheating when creating the results array by not populating objects
            let results : TaskVO[] = [new TaskVO(),new TaskVO(),new TaskVO()] ;
            taskModel.addedTasks = [new TaskVO(),new TaskVO(),new TaskVO()];
            spyOn(taskService, 'loadTasks').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = false;
                    result.resultObject = results;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.loadTasks(new TaskFilterVO());
            expect(taskModel.scheduledTasks.length).toBe(6);
        });

    });

    describe('onScheduleDateChange()', function() {

        it('We have SchedulerDate, so call', function () {
            spyOn(comp,"loadTasks")
            comp.schedulerDate = ({year:2017,day:20, month:10 }) as NgbDateStruct;
            comp.onScheduleDateChange();
            expect(comp.loadTasks).toHaveBeenCalled();
        });
        it('No SchedulerDate, so do not call', function () {
            spyOn(comp,"loadTasks")
            comp.schedulerDate = ({year:null,day:null, month:null }) as NgbDateStruct;;
            comp.onScheduleDateChange();
            expect(comp.loadTasks).not.toHaveBeenCalled();
        });
    });

    describe('onTaskUnschedule()', function() {

        it('Task with date scheduled', function () {
            let task : TaskVO = new TaskVO();
            task.dateScheduled = new Date();
            spyOn(comp,"scheduleTask")
            comp.onTaskUnschedule(task);
            expect(comp.scheduleTask).toHaveBeenCalledWith(task);
            expect(task.dateScheduled).toBeNull();
        });
        it('Task with no date scheduled', function () {
            let task : TaskVO = new TaskVO();
            task.dateScheduled = null;
            spyOn(comp,"deleteTaskFromSchedule")
            comp.deleteTaskFromSchedule(task);
            expect(comp.deleteTaskFromSchedule).toHaveBeenCalledWith(task);
        });
    });

    describe('deleteTaskFromSchedule()', function() {

        it('Remove Task In ScheduledTasks, but not addedTasks', function () {
            let task : TaskVO = new TaskVO();
            taskModel.scheduledTasks = [task,new TaskVO(),new TaskVO()]
            let oldScheduledTasksLength : Number = taskModel.scheduledTasks.length;
            taskModel.addedTasks = [new TaskVO(),new TaskVO()]
            let oldAddedModelLength : Number = taskModel.addedTasks.length;

            comp.deleteTaskFromSchedule(task);
            let newScheduledTasksLength : Number = taskModel.scheduledTasks.length+1;
            let newAddedModelLength : Number = taskModel.addedTasks.length;

            expect(oldScheduledTasksLength).toBe(newScheduledTasksLength);
            expect(oldAddedModelLength).toBe(newAddedModelLength);
        });

        it('Remove Task In ScheduledTasks and addedTasks', function () {
            let task : TaskVO = new TaskVO();
            taskModel.scheduledTasks = [task,new TaskVO(),new TaskVO()]
            let oldScheduledTasksLength : Number = taskModel.scheduledTasks.length;
            taskModel.addedTasks = [new TaskVO(),new TaskVO(),task]
            let oldAddedModelLength : Number = taskModel.addedTasks.length;

            comp.deleteTaskFromSchedule(task);
            let newScheduledTasksLength : Number = taskModel.scheduledTasks.length+1;
            let newAddedModelLength : Number = taskModel.addedTasks.length+1;

            expect(oldScheduledTasksLength).toBe(newScheduledTasksLength);
            expect(oldAddedModelLength).toBe(newAddedModelLength);
        });
    });

    describe('scheduleTask()', function() {

        it('Failure', function () {
            spyOn(taskService, 'scheduleTask').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = true;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.scheduleTask(new TaskVO());
            expect(comp.schedulerError).toBe('We could not remove the task from the schedule.');
        });

        it('Success, task not in scheduledtask list', function () {
            // cheating when creating the results array by not populating objects
            taskModel.tasks = [{taskID : 1, description:'something'} as TaskVO, {taskID : 2, description:'something else'} as TaskVO];
            let task = {taskID : 1, description:'something else'} as TaskVO;
            let results : TaskVO[] = [task] ;

            spyOn(taskModel, 'replaceTask').and.callThrough();
            spyOn(comp, 'deleteTaskFromSchedule');
            spyOn(taskService, 'scheduleTask').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = false;
                    result.resultObject = results;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.scheduleTask(task);
            expect(taskModel.replaceTask).toHaveBeenCalled();
            expect(taskModel.tasks[0].description).toBe("something else");
        });
        it('Success, task is in scheduledtasklist', function () {
            // cheating when creating the results array by not populating objects
            taskModel.tasks = [{taskID : 1, description:'something'} as TaskVO, {taskID : 2, description:'something else'} as TaskVO];
            let task = {taskID : 1, description:'something else'} as TaskVO;
            let results : TaskVO[] = [task] ;
            taskModel.scheduledTasks = [task, {taskID : 2, description:'something else'} as TaskVO];

            spyOn(taskModel, 'replaceTask').and.callThrough();
            spyOn(comp, 'deleteTaskFromSchedule');
            spyOn(taskService, 'scheduleTask').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = false;
                    result.resultObject = results;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.scheduleTask(task);
            expect(taskModel.replaceTask).toHaveBeenCalled();
            expect(comp.deleteTaskFromSchedule).toHaveBeenCalled();
            expect(taskModel.tasks[0].description).toBe("something else");
        });
    });

    describe('onTaskListSchedule()', function() {

        it('Failure', function () {
            comp.schedulerDate = {year:2017, month:10, day:10} as  NgbDateStruct;
//            taskModel.scheduledTasks = [new TaskVO(), new TaskVO(), new TaskVO()];
            spyOn(taskService, 'scheduleTaskList').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = true;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.onTaskListSchedule();
            expect(comp.schedulerError).toBe('We had an error scheduling all the tasks.');
        });

        it('Success', function () {
            comp.schedulerDate = {year:2017, month:10, day:10} as  NgbDateStruct;
            taskModel.tasks = [{taskID : 1} as TaskVO, new TaskVO(), new TaskVO()];
            taskModel.scheduledTasks = [{taskID : 1} as TaskVO, new TaskVO(), new TaskVO()];
            spyOn(taskService, 'scheduleTaskList').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = false;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.onTaskListSchedule();
            expect(taskModel.tasks[0].dateScheduled.getFullYear()).toBe(comp.schedulerDate.year);
            expect(taskModel.addedTasks.length).toBe(0);
        });

    });
});