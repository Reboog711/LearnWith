/*
 I put this file into all lower case when unit testing
 Because running code w/ mixed case would cause StaticInjectorError[UserModel] sometimes in regular scripts
 that was fixed w/ putting imporst into all lowercase
 But keeping it in lowercase would screw up unit testing
  */
import {Injectable} from "@angular/core";
import {TaskVO} from "../vo/TaskVO";

import {CompletedOptionVO} from "../vo/CompletedOptionVO";
import {TaskCategoryVO} from "../vo/TaskCategoryVO";

@Injectable()
export class TaskModel {
    tasks : TaskVO[];

    taskCompletedOptions : CompletedOptionVO[] = [
        new CompletedOptionVO(-1, 'All', null),
        new CompletedOptionVO(0, 'Open Tasks', false),
        new CompletedOptionVO(1, 'Completed Tasks', true)
    ];

    taskCategories : TaskCategoryVO[];

    scheduledTasks: TaskVO[] = [];
    addedTasks: TaskVO[]= [];

    onScheduleTaskRequest(task:TaskVO) {
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

    replaceTask (task:TaskVO) : void {
        for (let index :number = 0; index < this.tasks.length; ++index) {
            if (this.tasks[index].taskID === task.taskID) {
                this.tasks[index] = task;
                break;
            }
        }
    }
};
