import { async, TestBed,ComponentFixture } from '@angular/core/testing';
import {TaskGrid} from "../../../../../../src/com/dotComIt/learnWith/views/tasks/taskgrid.component";
import {TaskModel} from "../../../../../../src/com/dotComIt/learnWith/model/taskmodel";
import {TaskService} from "../../../../../../src/com/dotComIt/learnWith/services/mock/task.service";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {ResultObjectVO} from "../../../../../../src/com/dotComIt/learnWith/vo/ResultObjectVO";
import {TaskFilterVO} from "../../../../../../src/com/dotComIt/learnWith/vo/TaskFilterVO";
import {TaskVO} from "../../../../../../src/com/dotComIt/learnWith/vo/TaskVO";
import {TaskFilter} from "../../../../../../src/com/dotComIt/learnWith/views/tasks/taskfilter.component";


describe('TaskGrid Component', function () {
    let fixture: ComponentFixture<TaskGrid>;
    let comp: TaskGrid;
    let taskService : TaskService;
    let taskModel : TaskModel;

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TaskGrid);
            taskService = TestBed.get(TaskService);
            taskModel = TestBed.get(TaskModel);
            comp = fixture.componentInstance;
        });
    }));

    it('should create component', () => expect(comp).toBeDefined() );

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
            expect(comp.taskLoadError).toBe('We could not load any tasks.');
        });

        it('Success', function () {
            // cheating when creating the results array by not populating objects
            let results : TaskVO[] = [new TaskVO(),new TaskVO(),new TaskVO()] ;

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
            expect(taskModel.tasks).toBe(results);
            expect(comp.tasks).toBe(results);
            expect(comp.tasks.length).toBe(3);
        });

    });

    describe('onEditTask()', function() {

        it('Emit onEditTask', function () {
            spyOn(comp.editTaskRequest,"emit")
            comp.onEditTask("something");
            expect(comp.editTaskRequest.emit).toHaveBeenCalledWith("something");
        });
    });

    describe('onScheduleTaskRequest()', function() {

        it('Call onScheduleTaskRequest', function () {
            spyOn(taskModel,"onScheduleTaskRequest")
            comp.onScheduleTaskRequest("something");
            expect(taskModel.onScheduleTaskRequest).toHaveBeenCalledWith("something");
        });
    });

    describe('onCompletedCheckBoxChange()', function() {

        it('Failure', function () {
            spyOn(taskService, 'completeTask').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = true;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.onCompletedCheckBoxChange(new TaskVO());
            expect(comp.taskLoadError).toBe('Error completing the task.');
        });

        it('Success', function () {
            // cheating when creating the results array by not populating objects
            let results : TaskVO[] = [new TaskVO()] ;
            spyOn(taskModel,"replaceTask");

            spyOn(taskService, 'completeTask').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = false;
                    result.resultObject = results;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.onCompletedCheckBoxChange(results[0]);
            expect(taskModel.replaceTask).toHaveBeenCalledWith(results[0]);
        });

    });

});
