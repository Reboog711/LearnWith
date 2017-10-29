import { async, TestBed,ComponentFixture } from '@angular/core/testing';
import {TaskFilter} from "../../../../../../src/com/dotComIt/learnWith/views/tasks/taskfilter.component";

describe('TaskFilter Component', function () {
    let fixture: ComponentFixture<TaskFilter>;
    let comp: TaskFilter;

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TaskFilter);
            comp = fixture.componentInstance;
        });
    }));

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
