import {Component, ViewChild} from '@angular/core';
import {TaskGrid} from "./taskgrid.component";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {TaskVO} from "../../vo/TaskVO";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskCU} from "./taskcu.component";

@Component({
    selector: `tasks`,
    templateUrl : './com/dotComIt/learnWith/views/tasks/tasks.component.html',
    styleUrls: [ './com/dotComIt/learnWith/views/tasks/tasks.component.css' ]
})

export class TasksComponent {
    @ViewChild(TaskGrid)
    private taskgrid : TaskGrid;

    constructor(private modalService: NgbModal) {
    }

    filterRequest(filter:TaskFilterVO):void {
        this.taskgrid.loadTasks(filter);
    }
    newTask() : void {
        this.openTaskWindow('Create a New Task');
    }
    private openTaskWindow(title:string, task:TaskVO = null) {
        const modalRef = this.modalService.open(TaskCU );

        modalRef.componentInstance.title = title;
        modalRef.componentInstance.task = task;
        modalRef.result.then(
            (result) => {
                if (!task) {
                    this.taskgrid.tasks.push(result[0]);
                    this.taskgrid.refresh();
                } else {
                    for (let index = 0; index < this.taskgrid.tasks.length; ++index) {
                        if (this.taskgrid.tasks[index].taskID === result[0].taskID) {
                            this.taskgrid.tasks[index].description = result[0].description;
                            this.taskgrid.tasks[index].taskCategory = result[0].taskCategory;
                            this.taskgrid.tasks[index].taskCategoryID = result[0].taskCategoryID;
                            break;
                        }
                    }
                }
            }

        ).catch(
            (result) => {
            }
        );

    }

    editTask(task:TaskVO) : void {
        this.openTaskWindow('Edit Task', Object.assign( {}, task));
    }

}