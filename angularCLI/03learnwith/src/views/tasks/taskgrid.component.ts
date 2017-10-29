/**
 * Created by jhouser on 4/24/2017.
 */

import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import {TaskModel} from "../../model/taskmodel";
import {TaskVO} from "../../vo/TaskVO";
import {TaskService} from "../../services/mock/task.service";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {UserModel} from "../../model/usermodel";
// import {DatatableComponent} from "@swimlane/ngx-datatable";

@Component({
    selector: 'taskgrid',
    templateUrl : 'taskgrid.component.html',
    styleUrls: [ 'taskgrid.component.css' ]
})

export class TaskGrid  implements OnInit {

    @ViewChild(DatatableComponent) taskGrid: DatatableComponent;

    redraw() {
//        this.taskGrid.recalculate();
    }

    public tasks : TaskVO[];
    public taskLoadError :string = '';
    public schedulerState :boolean = false;

    @Output() editTaskRequest = new EventEmitter<TaskVO>();


    constructor(private taskModel :TaskModel, private taskService : TaskService, private userModel :UserModel) {
    }

    loadTasks(taskFilter:TaskFilterVO):void {
        this.taskLoadError = '';
        this.taskService.loadTasks(taskFilter).subscribe(
            result  => {
                console.log('task return');
                console.log(result);
                if ( result.error  ) {
                    this.taskLoadError = 'We could not load any tasks.';
                    return;
                }
                // probably want to do something to save user to some app global provider / global service
                // than redirect
                this.tasks = this.taskModel.tasks = result.resultObject as TaskVO[];
            }, error => {
                console.log(error);
                console.log('task service error loading tasks');
                this.taskLoadError = 'We had an error loading tasks.';
            }
        );
    }


    ngOnInit(): void {
        // Trigger the default load of data
        let taskFilter : TaskFilterVO = new TaskFilterVO();
        taskFilter.completed = false;
        // hard coding this start date value due to data
        // In a real world app we'd probably default it to today
        taskFilter.startDate = new Date('3/1/2017');
        this.loadTasks(taskFilter);
    }

    onEditTask(value:any) :void {
        console.log('in on edit task');
        console.log(value);
        this.editTaskRequest.emit(value);
    }

    onScheduleTaskRequest(task:any):void {
        this.taskModel.onScheduleTaskRequest(task);
    }

    onCompletedCheckBoxChange (task:TaskVO):void {
        // task.completed does not change inherently by clicking the checked value
        console.log(task);
        console.log(task.completed);

        this.taskLoadError = '';
        this.taskService.completeTask(task).subscribe(
            result  => {
                console.log(result);
                if ( result.error === true ) {
                    this.taskLoadError = 'Error completing the task.';
                    return;
                }
                this.taskModel.replaceTask(result.resultObject[0]);
            }, error => {
                console.log('task service error loading tasks');
                this.taskLoadError = 'We had an error saving the tasks.';
            }
        );

    }



}
