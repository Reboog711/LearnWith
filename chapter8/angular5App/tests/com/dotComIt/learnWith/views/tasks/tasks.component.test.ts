import {async, TestBed, ComponentFixture} from '@angular/core/testing';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

import {AppComponent} from "../../../../../../src/com/dotComIt/learnWith/main/app.component";
import {TasksComponent} from "../../../../../../src/com/dotComIt/learnWith/views/tasks/tasks.component";
import {TaskCU} from "../../../../../../src/com/dotComIt/learnWith/views/tasks/taskcu.component";

import {TaskVO} from "../../../../../../src/com/dotComIt/learnWith/vo/TaskVO";

describe('Tasks Component', function () {

    let fixture: ComponentFixture<TasksComponent>;
    let comp: TasksComponent;
    let modalService: NgbModal;

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TasksComponent);
            modalService = TestBed.get(NgbModal);
            TestBed.createComponent(AppComponent).componentInstance;
            comp = fixture.componentInstance;
        });
    }));

    describe('onToggleScheduler()', function() {

        it('Scheduler State True', function () {
            comp.schedulerState = true;
            comp.onToggleScheduler();
            expect(comp.schedulerState).toBeFalsy();
            expect(comp.gridContainerStyle).toBe('horizontal-layout-94');
            expect(comp.schedulerShowButtonLabel).toBe('<');
        });
        it('Scheduler State False', function () {
            comp.schedulerState = false;
            comp.onToggleScheduler();
            expect(comp.schedulerState).toBeTruthy();
            expect(comp.gridContainerStyle).toBe('horizontal-layout-60');
            expect(comp.schedulerShowButtonLabel).toBe('>');
        });
    });

    describe('openTaskWindow()', function() {
        it('Modal Opened', function () {
            spyOn(modalService,"open").and.callThrough();
            comp.openTaskWindow("Test Title");
            expect(modalService.open).toHaveBeenCalled();
        });
    });

    describe('Modal Ref Processing', function() {
        let modalRef : NgbModalRef;
        let task : TaskVO;
        beforeEach(() => {
            modalRef = modalService.open(TaskCU );
            spyOn(modalService,"open").and.returnValue(modalRef);
        });

        it('Modal Opened, Title Set, no Task', function () {
            comp.openTaskWindow("Test Title", task);
            expect(modalService.open).toHaveBeenCalled();
            expect(modalRef.componentInstance.title).toBe("Test Title");
            expect(modalRef.componentInstance.task).toBeNull();
        });

        it('Modal Opened, Task Set', function () {
            task = new TaskVO();
            comp.openTaskWindow("Test Title", task);
            expect(modalService.open).toHaveBeenCalled();
            expect(modalRef.componentInstance.title).toBe("Test Title");
            expect(modalRef.componentInstance.task).toBe(task);
        });

        it('Modal Opened, Closed with New Task', (done : DoneFn) => {
            comp.openTaskWindow("Test Title");
            let task : TaskVO[] = [{ taskID : 700,description : "something"} as TaskVO];
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                modalRef.close(task);
                fixture.whenStable().then(() => {
                    expect(fixture.componentInstance.taskgrid.tasks.length).toBe(25);
                    expect(fixture.componentInstance.taskgrid.tasks[
                    fixture.componentInstance.taskgrid.tasks.length-1
                        ]).toBe(task[0]);
                    done();

                });

            });

        });

        it('Modal Opened, Edit Existing Task', (done : DoneFn) => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let task : TaskVO = fixture.componentInstance.taskgrid.tasks[fixture.componentInstance.taskgrid.tasks.length-1] as TaskVO;
                task.description = "Something Else";
                comp.openTaskWindow("Test Title", task);
                modalRef.close(task);
                fixture.whenStable().then(() => {
                    expect(fixture.componentInstance.taskgrid.tasks.length).toBe(24);
                    expect(fixture.componentInstance.taskgrid.tasks[fixture.componentInstance.taskgrid.tasks.length-1]).toBe(task);
                    expect(fixture.componentInstance.taskgrid.tasks[fixture.componentInstance.taskgrid.tasks.length-1].description).toBe("Something Else");
                    done();

                });

            });

        });




    });



});
