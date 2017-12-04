// console.log('mock.task.service.tests');

import {TaskService} from "../../../../../../src/com/dotComIt/learnWith/services/mock/task.service";
import {ResultObjectVO} from "../../../../../../src/com/dotComIt/learnWith/vo/ResultObjectVO";
import {TaskFilterVO} from "../../../../../../src/com/dotComIt/learnWith/vo/TaskFilterVO";
import {Observable} from "rxjs/Observable";
import {TaskVO} from "../../../../../../src/com/dotComIt/learnWith/vo/TaskVO";
import {UserVO} from "../../../../../../src/com/dotComIt/learnWith/vo/UserVO";

describe('Mock Task Service', function () {

    let taskService : TaskService;

    beforeEach(() => {
        taskService = new TaskService();
    });

    describe('loadTaskCategories() ', function () {

        it('Task Categories Loaded', (done: DoneFn) => {
            let o : Observable<ResultObjectVO> = taskService.loadTaskCategories();
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(2);
                done();
            });
        });

    });
    describe('loadTasks() ', function () {
        it('Load Completed Tasks', (done: DoneFn) => {
            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.completed = true;
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(6);
                done();
            });
        });

        it('Load Not Completed Tasks', (done: DoneFn) => {
            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.completed = false;
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(25);
                done();
            });
        });
        it('Load Task Category ID 1', (done: DoneFn) => {
            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.taskCategoryID = 1;
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(17);
                done();
            });
        });
        it('Load Start Date 04/28/2016', (done: DoneFn) => {
            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.startDate = new Date("04/28/2016");
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(31);
                done();
            });
        });
        it('Load End Date 04/28/2016', (done: DoneFn) => {
            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.endDate = new Date("05/28/2017");
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(15);
                done();
            });
        });
        it('Schedule Start Date 11/22/2017',(done: DoneFn) => {
            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.scheduledStartDate = new Date("11/22/2017");
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(5);
                done();
            });
        });
        it('Schedule End Date 11/22/2017',(done: DoneFn) => {
            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.scheduledEndDate = new Date("11/22/2017");
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(12);
                done();
            });
        });
        it('Schedule Equal Date 11/22/2017',(done: DoneFn) => {
            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.scheduledEqualDate = new Date("11/22/2017");
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(3);
                done();
            });
        });

    });
    describe('updateTask() ', function () {
        it('Create Task',(done: DoneFn) => {
            let task : TaskVO  = {taskID:0, taskCategoryID : 2, description:'Brand New Task 1'} as TaskVO;
            let user : UserVO = { } as UserVO;

            let o : Observable<ResultObjectVO> = taskService.updateTask(task, user);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject[0].taskID).toBe(32);
                expect(value.resultObject[0].taskCategory).toBe('Personal');
                done();
            });
        });
        it('Update Task',(done: DoneFn) => {
            let task : TaskVO  = {taskID:1, taskCategoryID : 1} as TaskVO;
            let user : UserVO = { } as UserVO;

            let o : Observable<ResultObjectVO> = taskService.updateTask(task, user);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject[0].taskID).toBe(1);
                expect(value.resultObject[0].taskCategory).toBe('Business');
                done();
            });
        });

    });

    describe('scheduleTask() ', function () {
        it('Schedule Task',(done: DoneFn) => {
            let task : TaskVO  = {taskID:10, taskCategoryID : 2} as TaskVO;

            let o : Observable<ResultObjectVO> = taskService.scheduleTask(task);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject[0]).toBe(task);
                done();
            });
        });
    });

    describe('scheduleTaskList() ', function () {
        it('Schedule Task List',(done: DoneFn) => {
            let tasks : TaskVO[]  = [];

            let o : Observable<ResultObjectVO> = taskService.scheduleTaskList(tasks,new Date("11/22/2017"));
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                done();
            });
        });
    });

    describe('completeTask() ', function () {
        it('Make task Completed',(done: DoneFn) => {
            let task : TaskVO  = {taskCategoryID:1,taskID:10,completed:false} as TaskVO;

            let o : Observable<ResultObjectVO> = taskService.completeTask(task);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject[0].completed).toBeTruthy();

                done();
            });
        });

        it('Make task Not Completed',(done: DoneFn) => {
            let task : TaskVO  = {taskCategoryID:1, taskID:10, completed :true} as TaskVO;

            let o : Observable<ResultObjectVO> = taskService.completeTask(task);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject[0].completed).toBeFalsy();

                done();
            });
        });

    });

});
