import {async, TestBed} from '@angular/core/testing';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

import {TaskCU} from "../../../../../../src/com/dotComIt/learnWith/views/tasks/taskcu.component";
import {TaskService} from "../../../../../../src/com/dotComIt/learnWith/services/mock/task.service";

import {ResultObjectVO} from "../../../../../../src/com/dotComIt/learnWith/vo/ResultObjectVO";
import {TaskVO} from "../../../../../../src/com/dotComIt/learnWith/vo/TaskVO";


describe('TaskCUComponent', function () {
    let comp: TaskCU;
    let taskService : TaskService;
    let modalService: NgbModal;

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            // create components before setting up the router
            // this is an important order of operations beacuse router has issues if the router-outlet component is not defined
            taskService = TestBed.get(TaskService);
            modalService = TestBed.get(NgbModal);
            const modalRef : NgbModalRef = modalService.open(TaskCU);
            comp = modalRef.componentInstance;
        });
    }));

    it('should create component', () => expect(comp).toBeDefined() );

    describe('onSave()', function() {

        it('Failure', function () {
            spyOn(taskService, 'updateTask').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = true;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.onSave();
            expect(comp.taskUpdateError).toBe('There was a problem saving the task.');
        });
        it('Success', function () {
            spyOn(taskService, 'updateTask').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = false;
                    result.resultObject = new TaskVO();
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.onSave();
            expect(comp.taskUpdateError).toBe('');
        });

        it('Rejection', function () {
            spyOn(taskService, 'updateTask').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    observer.error({});
                    observer.complete();
                })
            );
            comp.onSave();
            expect(comp.taskUpdateError).toBe('There was a problem saving the task.');
        });

    });
});
