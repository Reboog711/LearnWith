import {Component, ViewChild} from '@angular/core';
import {TaskGrid} from "./taskgrid.component";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {TaskVO} from "../../vo/TaskVO";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskCU} from "./taskcu.component";
import {TaskScheduler} from "./taskscheduler.component";
@Component({
    selector: `tasks`,
    templateUrl : './com/dotComIt/learnWith/views/tasks/tasks.component.html',
    styleUrls: [ './com/dotComIt/learnWith/views/tasks/tasks.component.css' ]
})

export class TasksComponent {
    @ViewChild(TaskGrid)
    private taskgrid : TaskGrid;
    @ViewChild(TaskScheduler) private taskscheduler : TaskScheduler;

    public gridContainerStyle : string = 'horizontal-layout-94';
    public schedulerState : boolean = false;
    public schedulerShowButtonLabel : string = "<";

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
                setTimeout(() => this.taskgrid.taskGrid.recalculate(), 100);
            }
        ).catch(
            (result) => {
            }
        );

    }

    editTask(task:TaskVO) : void {
        this.openTaskWindow('Edit Task', Object.assign( {}, task));
    }

    onToggleScheduler(): void {
        if ( this.schedulerState === true) {
            this.schedulerState = this.taskgrid.schedulerState = false;
            this.gridContainerStyle = 'horizontal-layout-94';
            this.schedulerShowButtonLabel = "<";
        } else {
            this.schedulerState = this.taskgrid.schedulerState = true;
            this.gridContainerStyle = 'horizontal-layout-60';
            this.schedulerShowButtonLabel = ">";
            this.taskscheduler.initialLoad(new Date());
        }
        setTimeout(() => this.taskgrid.taskGrid.recalculate(), 100);
    }

}