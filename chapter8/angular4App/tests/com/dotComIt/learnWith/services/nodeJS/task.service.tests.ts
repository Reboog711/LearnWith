console.log('nodejs.task.service.tests');

import {Observable} from "rxjs/Observable";
import { async, ComponentFixture, TestBed, fakeAsync, tick   } from '@angular/core/testing';
import {   JsonpModule, JSONPBackend, HttpModule, Http, Response, XHRBackend, ResponseOptions  } from '@angular/http';

import {TaskService} from   "../../../../../../src/com/dotComIt/learnWith/services/mock/task.service";
import {TaskServiceNodeJS} from "../../../../../../src/com/dotComIt/learnWith/services/nodeJS/task.service";
import { MockBackend } from '@angular/http/testing';
import {ResultObjectVO} from "../../../../../../src/com/dotComIt/learnWith/vo/ResultObjectVO";
import {UserVO} from "../../../../../../src/com/dotComIt/learnWith/vo/UserVO";
import {TaskFilterVO} from "../../../../../../src/com/dotComIt/learnWith/vo/TaskFilterVO";
import {TaskVO} from "../../../../../../src/com/dotComIt/learnWith/vo/TaskVO";

describe('NodeJS Task Service', function () {
    let taskService : TaskServiceNodeJS;
    let mockBackend : MockBackend;
    let mockResponse : ResultObjectVO;

    beforeEach(async(() => {
        // first we want to replace the default AuthenticationService set up in the base.spec with the ColdFusion one
        // could use overrideProvider in theory, but not available in the version I'm using
        TestBed.configureTestingModule({
            providers: [ { provide: TaskService, useClass: TaskServiceNodeJS },
                { provide: JSONPBackend, useClass: MockBackend },
                { provide: XHRBackend, useClass: MockBackend }] ,
            imports : [JsonpModule/*, HttpModule */]
        });

        TestBed.compileComponents().then(() => {
            taskService = TestBed.get(TaskService);
            mockBackend = TestBed.get(JSONPBackend);
        });
    }));

    describe('loadTaskCategories() ', function () {

        beforeEach(() => {
            mockResponse = new ResultObjectVO();
            mockResponse.error = false;
            // need to add fake third option because the 'all categories' is being added by the server
            // which our Angular code strips out; kind of a side affect of changes between the AngularJS code and the Angular4 code.
            mockResponse.resultObject = [
                {},
                {taskCategoryID: 1, taskCategory: "Business"},
                {taskCategoryID: 2, taskCategory: "Personal"}
            ];
        });

        it('Task Categories Loaded', () => {

            mockBackend.connections.subscribe((connection: any) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });

            let o: Observable<ResultObjectVO> = taskService.loadTaskCategories();
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(2);
            });
        });
    });

    describe('loadTasks() ', function () {
        beforeEach(() => {
            mockResponse = new ResultObjectVO();
            mockResponse.error = false;
            // just creating empty objects since we're only checking the length
            mockResponse.resultObject = [
                { }, { }, { }, { }, { },
                { }, { }, { }, { }, { },
                { }, { }, { }, { }, { },
                { }, { }, { }, { }, { },
                { }, { }, { }, { }, { }
            ];
        });

        it('Load Completed Tasks', () => {
            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })


            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.completed = true;
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(25);
            });
        });

        it('Load Not Completed Tasks', () => {
            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })

            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.completed = false;
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(25);
            });
        });

        it('Load Task Category ID 1', () => {
            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })


            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.taskCategoryID = 1;
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(25);
            });
        });

        it('Load Start Date 04/28/2016', () => {
            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })

            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.startDate = new Date("04/28/2016");
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(25);
            });
        });

        it('Load End Date 04/28/2016', () => {
            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })
            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.endDate = new Date("05/28/2017");
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(25);
            });
        });
        it('Schedule Start Date 11/22/2017',() => {
            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })
            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.scheduledStartDate = new Date("11/22/2017");
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(25);
            });
        });
        it('Schedule End Date 11/22/2017',() => {
            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })
            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.scheduledEndDate = new Date("11/22/2017");
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(25);
            });
        });

        it('Schedule Equal Date 11/22/2017',() => {
            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })
            var taskFilter : TaskFilterVO = new TaskFilterVO();
            taskFilter.scheduledEqualDate = new Date("11/22/2017");
            let o : Observable<ResultObjectVO> = taskService.loadTasks(taskFilter);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject.length).toBe(25);
            });
        });
    });


    describe('updateTask() ', function () {
        beforeEach(() => {
            mockResponse = new ResultObjectVO();
            mockResponse.error = false;
            // just creating empty objects since we're only checking the length
        });


        it('Create Task',() => {

            mockResponse.resultObject = [{taskID:32, taskCategoryID : 2, taskCategory : "Personal", description:'Brand New Task 1'}];

            let task : TaskVO  = {taskID:0, taskCategoryID : 2, description:'Brand New Task 1'} as TaskVO;
            let user : UserVO = { } as UserVO;

            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })

            let o : Observable<ResultObjectVO> = taskService.updateTask(task, user);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject[0].taskID).toBe(32);
                expect(value.resultObject[0].taskCategory).toBe('Personal');
            });
        });
        it('Update Task',() => {
            mockResponse.resultObject = [{taskID:1, taskCategoryID : 1, taskCategory : "Business", description:'Brand New Task 1'}];

            let task : TaskVO  = {taskID:1, taskCategoryID : 1} as TaskVO;
            let user : UserVO = { } as UserVO;

            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })

            let o : Observable<ResultObjectVO> = taskService.updateTask(task, user);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject[0].taskID).toBe(1);
                expect(value.resultObject[0].taskCategory).toBe('Business');
            });
        });

    });

    describe('scheduleTask() ', function () {
        beforeEach(() => {
            mockResponse = new ResultObjectVO();
            mockResponse.error = false;
            // just creating empty objects since we're only checking the length
        });

        it('Schedule Task',() => {
            let task : TaskVO  = {taskID:10, taskCategoryID : 2} as TaskVO;
            mockResponse.resultObject = [task];

            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })


            let o : Observable<ResultObjectVO> = taskService.scheduleTask(task);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject[0].taskID).toBe(10);
                expect(value.resultObject[0].taskCategoryID).toBe(2);
            });
        });
    });

    describe('scheduleTaskList() ', function () {
        beforeEach(() => {
            mockResponse = new ResultObjectVO();
            mockResponse.error = false;
        });
        it('Schedule Task List',() => {
            let tasks : TaskVO[]  = [];

            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })

            let o : Observable<ResultObjectVO> = taskService.scheduleTaskList(tasks,new Date("11/22/2017"));
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
            });
        });
    });

    describe('completeTask() ', function () {
        let task : TaskVO ;
        beforeEach(() => {
            mockResponse = new ResultObjectVO();
            mockResponse.error = false;
            task = {taskCategoryID:1,taskID:10,completed:true} as TaskVO;
            mockResponse.resultObject = [task];
        });
        it('Make task Completed',() => {

            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })
            let o : Observable<ResultObjectVO> = taskService.completeTask(task);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject[0].completed).toBeTruthy();
            });
        });
        it('Make task Not Completed',() => {
            task.completed = false;
            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })

            let o : Observable<ResultObjectVO> = taskService.completeTask(task);
            o.subscribe(value => {
                expect(value.error).toBeFalsy();
                expect(value.resultObject[0].completed).toBeFalsy();
            });
        });
    });

});
