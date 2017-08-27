/**
 * Created by jhouser on 4/26/2017.
 */


import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {TaskService} from "../../services/mock/task.service";
import {TaskModel} from "../../model/taskmodel";

import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskCategoryVO} from "../../vo/TaskCategoryVO";
import {TaskCU} from "./taskcu.component";

@Component({
    selector: 'taskfilter',
    templateUrl : './com/dotComIt/learnWith/views/tasks/taskfilter.component.html',
    styleUrls: [ './com/dotComIt/learnWith/views/tasks/taskfilter.component.css' ]
})

export class TaskFilter  implements OnInit {

    filterError : string;
    completed : string;
    taskCategoryID : string;
    startDate : NgbDateStruct;
    endDate : NgbDateStruct;
    scheduledStartDate : NgbDateStruct;
    scheduledEndDate : NgbDateStruct;
    taskCategories : TaskCategoryVO[];

    @Output() filterRequest = new EventEmitter<TaskFilterVO>();

    @Output() newTaskRequest = new EventEmitter();

    constructor(private taskModel :TaskModel, private taskService : TaskService ) {
    }

    ngOnInit(): void {
        this.completed = "false";
        this.loadTaskCategories();
//        this.taskFilter.startDate = new Date();
//        console.log(this.taskFilter.startDate);

//        this.taskCompletedOptions = this.taskModel.taskCompletedOptions;

        // need to call service to populate this
//        this.taskCategories = this.taskModel.taskCategories;
    };

    loadTaskCategories():void {
        this.taskService.loadTaskCategories().subscribe(
            result  => {
                console.log('task category return');
                if ( result.error ) {
                    console.log('Error loading task Categories');
                    this.filterError = 'Error loading task Categories';
                    return;
                }
                // probably want to do something to save user to some app global provider / global service
                // than redirect
                this.taskModel.taskCategories = result.resultObject as TaskCategoryVO[];
                this.taskCategories = Object.assign( [], this.taskModel.taskCategories );
                console.log('did Object.assign()');
                console.log(this.taskCategories);
                console.log(this.taskModel.taskCategories);

                // add all category; which we want in the filter; but not in other places we'll use this array

                let allTask = new TaskCategoryVO();
                allTask.taskCategoryID = 0;
                allTask.taskCategory = "All Categories";
                this.taskCategories.unshift(allTask);

                this.taskCategoryID = "0";

                console.log('task categories results');
                console.log(this.taskCategories);
                console.log(this.taskModel.taskCategories);
            },
            error  => {
                console.log('task category service error');
                this.filterError = 'There was a task category service error';
            }

        );
    };

    filter():void {
        // set TaskFilter DateProperties if appropriate:
        // completed and category are set by default
        let taskFilter : TaskFilterVO = new TaskFilterVO();

        if (this.startDate) {
            taskFilter.startDate = new Date(this.startDate.month + '/' + this.startDate.day + '/' + this.startDate.year) ;
        } else {
            taskFilter.startDate = null;
        }
        if (this.endDate) {
            taskFilter.endDate = new Date(this.endDate.month + '/' + this.endDate.day + '/' + this.endDate.year) ;
        } else {
            taskFilter.endDate = null;
        }
        if (this.scheduledStartDate) {
            taskFilter.scheduledStartDate = new Date(this.scheduledStartDate.month + '/' + this.scheduledStartDate.day
                + '/' + this.scheduledStartDate.year) ;
        } else {
            taskFilter.scheduledStartDate = null;
        }
        if (this.scheduledEndDate) {
            taskFilter.scheduledEndDate = new Date(this.scheduledEndDate.month + '/' + this.scheduledEndDate.day + '/'
                + this.scheduledEndDate.year) ;
        } else {
            taskFilter.scheduledEndDate = null;
        }

        console.log('something');
        console.log(this.completed);

        if (this.completed === "null") {
           taskFilter.completed = null;
        } else if (this.completed === "false" ) {
            taskFilter.completed = false;
        } else {
            taskFilter.completed = true;
        }

        taskFilter.taskCategoryID = Number(this.taskCategoryID);


        console.log('start date');
        console.log(taskFilter);

        // dispatch TaskFilter Event
        this.filterRequest.emit(taskFilter);
    }


    newTask() : void {
        this.newTaskRequest.emit();
    }

/*    updateCompleted(event:Event):void {
        console.log('in update completed');
        console.log(event);
        console.log(this.taskFilter.completed);
    }*/

    // *ngFor="let hero of heroes"
}
