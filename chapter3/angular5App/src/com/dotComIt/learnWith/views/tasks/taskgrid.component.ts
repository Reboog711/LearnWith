import {Component, OnInit} from '@angular/core';
import {TaskModel} from '../../model/taskmodel';

import {TaskVO} from "../../vo/TaskVO";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {TaskService} from "../../services/mock/task.service";

@Component({
    selector: 'taskgrid',
    templateUrl : './com/dotComIt/learnWith/views/tasks/taskgrid.component.html',
    styleUrls: [ './com/dotComIt/learnWith/views/tasks/taskgrid.component.css']
})

export class TaskGrid implements OnInit {
    public tasks : TaskVO[];
    public taskLoadError :string = '';


    constructor(private taskModel :TaskModel, private taskService : TaskService) {
    }

    ngOnInit(): void {
        let taskFilter : TaskFilterVO = new TaskFilterVO();
        taskFilter.completed = false;
        taskFilter.startDate = new Date('3/1/2017');
        this.loadTasks(taskFilter);
    }

    loadTasks(taskFilter:TaskFilterVO):void {
        this.taskLoadError = '';
        this.taskService.loadTasks(taskFilter).subscribe(
            result  => {
                // result code here
                if ( result.error ) {
                    this.taskLoadError = 'We could not load any tasks.';
                    return;
                }
                this.tasks = this.taskModel.tasks = result.resultObject as TaskVO[];

            },
            error => {
                this.taskLoadError = 'We had an error loading tasks.';
            }
        );

    }


}
