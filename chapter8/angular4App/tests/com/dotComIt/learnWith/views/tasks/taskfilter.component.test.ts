import { async, TestBed,ComponentFixture } from '@angular/core/testing';
import {TaskFilter} from "../../../../../../src/com/dotComIt/learnWith/views/tasks/taskfilter.component";
import {TaskModel} from "../../../../../../src/com/dotComIt/learnWith/model/taskmodel";
import {TaskCategoryVO} from "../../../../../../src/com/dotComIt/learnWith/vo/TaskCategoryVO";
import {TaskService} from "../../../../../../src/com/dotComIt/learnWith/services/mock/task.service";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {ResultObjectVO} from "../../../../../../src/com/dotComIt/learnWith/vo/ResultObjectVO";
import {TaskFilterVO} from "../../../../../../src/com/dotComIt/learnWith/vo/TaskFilterVO";
import {EventEmitter} from "@angular/core";

describe('TaskFilter Component', function () {
    let fixture: ComponentFixture<TaskFilter>;
    let comp: TaskFilter;
    let taskService : TaskService;
    let taskModel : TaskModel;

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TaskFilter);
            taskService = TestBed.get(TaskService);
            taskModel = TestBed.get(TaskModel);
            comp = fixture.componentInstance;
        });
    }));

    it('should create component', () => expect(comp).toBeDefined() );

    describe('loadTaskCategories()', function() {

        it('Failure', function () {
            spyOn(taskService, 'loadTaskCategories').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = true;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.loadTaskCategories();
            expect(comp.filterError).toBe('Error loading task Categories');
        });
        it('Success', function () {
            var results : TaskCategoryVO[] = [
                { taskCategoryID :1, taskCategory:"Business"},
                { taskCategoryID :2, taskCategory:"Personal"}
            ];
            spyOn(taskService, 'loadTaskCategories').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = false;
                    result.resultObject = results;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.loadTaskCategories();
//            expect(comp.filterError).toBe('');
            expect(taskModel.taskCategories).toBe(results);
            expect(taskModel.taskCategories.length).toBe(2);
            expect(comp.taskCategories.length).toBe(3);
        });

    });

    describe('filter()', function() {

        it('Emit FilterRequest', function () {
            spyOn(comp.filterRequest,"emit")
            comp.filter();
            expect(comp.filterRequest.emit).toHaveBeenCalled();
        });

    });

    describe('newTask()', function() {

        it('Emit NewTask', function () {
            spyOn(comp.newTaskRequest,"emit")
            comp.newTask();
            expect(comp.newTaskRequest.emit).toHaveBeenCalled();
        });

    });

});
