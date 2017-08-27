/**
 * Created by jhouser on 4/24/2017.
 */

import {TaskVO} from "../vo/TaskVO";
import {CompletedOptionVO} from "../vo/CompletedOptionVO";
import {TaskCategoryVO} from "../vo/TaskCategoryVO";
import {TaskFilterVO} from "../vo/TaskFilterVO";
import {TaskService} from "../services/mock/task.service";
import {ResultObjectVO} from "../vo/ResultObjectVO";
import {Injectable} from "@angular/core";


@Injectable()
export class TaskModel {

    constructor(private taskService :TaskService) {
    };

    tasks : TaskVO[];

    taskCompletedOptions : CompletedOptionVO[] = [
        new CompletedOptionVO(-1, 'All', null),
        new CompletedOptionVO(0, 'Open Tasks', false),
        new CompletedOptionVO(1, 'Completed Tasks', true)
    ];

    taskCategories : TaskCategoryVO[];

    scheduledTasks: TaskVO[] = [];
    addedTasks: TaskVO[] = [];

    onScheduleTaskRequest(task:TaskVO) {
        console.log('in here');
        let found :boolean = false;
        for (let index :number = 0; index < this.scheduledTasks.length; index++) {
            if (this.scheduledTasks[index].taskID === task.taskID) {
                found = true;
                break;
            }
        }
        if (!found) {
            this.scheduledTasks.push(task);
            this.addedTasks.push(task);
        }
    }


    replaceTask (task:TaskVO) :void {
        for (let index :number = 0; index < this.tasks.length; ++index) {
            console.log(index);
            if (this.tasks[index].taskID === task.taskID) {
                console.log('Before ReplaceTask at index ' + index);
                console.log(this.tasks[index]);
                console.log(this.tasks[index].completed);
                this.tasks[index] = task;
                console.log('replacedTask at index ' + index);
                console.log(this.tasks[index]);
                console.log(this.tasks[index].completed);
                break;
            }
        }
    }


};
