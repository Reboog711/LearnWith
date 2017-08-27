/**
 * Created by jhouser on 4/29/2017.
 */

import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/mock/task.service";
import {TaskVO} from "../../vo/TaskVO";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {TaskModel} from "../../model/taskmodel";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {TaskFilter} from "./taskfilter.component";

@Component({
    selector: 'taskscheduler',
    templateUrl : './com/dotComIt/learnWith/views/tasks/taskscheduler.component.html',
    styleUrls: [ './com/dotComIt/learnWith/views/tasks/taskscheduler.component.css' ]
})


export class TaskScheduler  implements OnInit {

    schedulerDate: NgbDateStruct;
    schedulerError: string;

    constructor(private taskService: TaskService, private taskModel: TaskModel) {
        console.log(taskModel);
        console.log(taskModel.scheduledTasks);
    }

    ngOnInit(): void {
    }

    initialLoad(schedulerDate: Date): void {

        let taskFilter: TaskFilterVO = new TaskFilterVO();
        taskFilter.scheduledEqualDate = schedulerDate;
        this.schedulerDate = {
            day: taskFilter.scheduledEqualDate.getUTCDate(), month: taskFilter.scheduledEqualDate.getUTCMonth() + 1,
            year: taskFilter.scheduledEqualDate.getUTCFullYear()
        };
        console.log(this.schedulerDate);
        this.loadTasks(taskFilter);

    }


    loadTasks(taskFilter: TaskFilterVO): void {
        this.schedulerError = '';
        this.taskService.loadTasks(taskFilter).subscribe(
            result => {
                console.log(result);
                if (result.error === true) {
                    this.schedulerError = 'We could not load any tasks.';
                    return;
                }
                this.taskModel.scheduledTasks = result.resultObject as TaskVO[];
                this.taskModel.scheduledTasks = this.taskModel.scheduledTasks.concat(this.taskModel.addedTasks);
            }, error  => {
                console.log('task service error loading tasks');
                this.schedulerError = 'We had an error loading tasks.';
            }
        );
    }


    onScheduleDateChange(): void {

        console.log(this.schedulerDate);

        if (this.schedulerDate.year) {
            let taskFilter: TaskFilterVO = new TaskFilterVO();
            taskFilter.scheduledEqualDate = new Date(this.schedulerDate.month + '/' + this.schedulerDate.day + '/' +
                this.schedulerDate.year);
            this.loadTasks(taskFilter);

        }
        ;
    };

    onTaskUnschedule(task: TaskVO): void {
        console.log('on task unschedule');
        console.log(task.dateScheduled);
        if (task.dateScheduled) {
            task.dateScheduled = null;
            this.scheduleTask(task);
        } else {
            this.deleteTaskFromSchedule(task);
        }
    };

    deleteTaskFromSchedule(task: TaskVO): void {
        console.log('Delete Item from Task');
        let itemIndex : number = this.taskModel.scheduledTasks.indexOf(task);
        if (itemIndex >= 0) {
            this.taskModel.scheduledTasks.splice(itemIndex, 1);
        }
        itemIndex = this.taskModel.addedTasks.indexOf(task);
        if (itemIndex >= 0) {
            this.taskModel.addedTasks.splice(itemIndex, 1);
        }
    }

    scheduleTask(task:TaskVO): void {
        this.schedulerError = '';
        this.taskService.scheduleTask(task).subscribe(
            result => {
                console.log('task scheduler schedule task success');
                console.log(result);
                if (result.error === true) {
                    this.schedulerError = 'We could not remove the task from the schedule.';
                    return;
                }
                this.taskModel.replaceTask(result.resultObject[0]);
                for (let index : number = 0; index < this.taskModel.scheduledTasks.length; ++index) {
                    if (this.taskModel.scheduledTasks[index].taskID === result.resultObject[0].taskID) {
                        this.deleteTaskFromSchedule(this.taskModel.scheduledTasks[index]);
                    }
                }
            }, error => {
                console.log('We had an error scheduling the tasks.');
                this.schedulerError = 'We had an error scheduling the tasks.';
            }

        );
    };

    onTaskListSchedule() {
        let localDate : Date = new Date(this.schedulerDate.month + '/' + this.schedulerDate.day + '/' +
            this.schedulerDate.year);
        this.taskService.scheduleTaskList(this.taskModel.scheduledTasks, localDate).subscribe(
            result => {
                console.log('task scheduler schedule all tasks');
                console.log(result);
                if (result.error === true) {
                    this.schedulerError = 'We had an error scheduling all the tasks.';
                    return;
                }

                for (let scheduledTaskIndex : number = 0; scheduledTaskIndex < this.taskModel.scheduledTasks.length; scheduledTaskIndex++) {
                    for (let masterTaskIndex :number = 0; masterTaskIndex < this.taskModel.tasks.length; masterTaskIndex++) {
                        if (this.taskModel.tasks[masterTaskIndex].taskID === this.taskModel.scheduledTasks[scheduledTaskIndex].taskID) {
                            this.taskModel.tasks[masterTaskIndex].dateScheduled = localDate;
                            break;
                        }
                    }
                }
                this.taskModel.addedTasks = [];

            }, result => {
                console.log('We had an error scheduling all the tasks.');
                this.schedulerError = 'We had an error scheduling all the tasks.';
            }
        );
    }
}