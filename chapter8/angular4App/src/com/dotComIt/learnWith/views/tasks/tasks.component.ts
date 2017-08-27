/**
 * Created by jhouser on 4/21/2017.
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from "../../model/usermodel";
import {Router} from "@angular/router";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {TaskGrid} from "./taskgrid.component";
import {TaskCU} from "./taskcu.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskVO} from "../../vo/TaskVO";
import {TaskModel} from "../../model/taskmodel";
import {TaskScheduler} from "./taskscheduler.component";

@Component({
    selector: 'tasks',
    templateUrl : './com/dotComIt/learnWith/views/tasks/tasks.component.html',
    styleUrls: [ './com/dotComIt/learnWith/views/tasks/tasks.component.css' ]
})

export class TasksComponent  implements OnInit {

    @ViewChild(TaskGrid)
    private taskgrid : TaskGrid;

    @ViewChild(TaskScheduler)
    private taskscheduler : TaskScheduler;

    // added
    public gridContainerStyle :string= 'horizontal-layout-94';
    public schedulerState :boolean = false;
    public schedulerShowButtonLabel :string = "<";

    constructor(private userModel :UserModel, private router: Router, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        if ( !this.userModel.validateUser()) {
            this.router.navigate(['/login']);
        }

        if (this.userModel.isUserInRole(this.userModel.CREATOR_ROLE)) {
            this.gridContainerStyle = 'horizontal-layout-100';
        }
    }

    filterRequest(filter:TaskFilterVO):void {
        console.log('in filter request');
        console.log(filter);
        this.taskgrid.loadTasks(filter);
    }


    private openTaskWindow(title:string, task:TaskVO = null) {
        const modalRef = this.modalService.open(TaskCU );
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.task = task;

        modalRef.result.then((result) => {
            if (!task) {
                console.log('Brand new task');
                // if the task argument is null; we are doing a create.  Add task to taskModel.tasks array
                // already done based on service
                this.taskgrid.tasks.push(result[0]);
            } else {
                console.log('updated task');
                // if task argument is not null; we updated the task; so also update the main array
                for (let index = 0; index < this.taskgrid.tasks.length; ++index) {
                    console.log(this.taskgrid.tasks[index].taskID);
                    console.log(result[0].taskID);
                    if (this.taskgrid.tasks[index].taskID === result[0].taskID) {
                        this.taskgrid.tasks[index].description = result[0].description;
                        this.taskgrid.tasks[index].taskCategory = result[0].taskCategory;
                        this.taskgrid.tasks[index].taskCategoryID = result[0].taskCategoryID;
                        break;
                    }
                }

            }
            console.log(this.taskgrid.tasks);

        }).catch( (result) => {
            console.log(result);
            console.log('cancelling changes');
        });
    };

    newTask() : void {
        this.openTaskWindow('Create a New Task');
    }

    editTask(task:TaskVO) : void {
        console.log('tasks edit task');
        this.openTaskWindow('Edit Task', Object.assign( {}, task ));
    }

    // Chapter 6
    onToggleScheduler(): void {

        if ( this.schedulerState === true) {
            this.schedulerState = this.taskgrid.schedulerState = false;
            this.gridContainerStyle = 'horizontal-layout-94';
            this.schedulerShowButtonLabel = "<";
        } else {
            this.schedulerState = this.taskgrid.schedulerState = true;
            this.gridContainerStyle = 'horizontal-layout-60';
            this.schedulerShowButtonLabel = ">";
            // line new Chapter 6
            this.taskscheduler.initialLoad(new Date());
        }

        // kludge to get grid columns to resize properly
        setTimeout(() => this.taskgrid.taskGrid.recalculate(), 100);

    }


}