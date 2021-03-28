import {TaskVO} from "../vo/task-vo";
import {Injectable} from "@angular/core";
import {CompletedOptionVO} from "../vo/completed-option-vo";
import {TaskCategoryVO} from "../vo/task-category-vo";

@Injectable({
  providedIn: 'root'
})
export class TaskModel {
  tasks! : TaskVO[];
  taskCategories! : TaskCategoryVO[];
  scheduledTasks: TaskVO[] = [];
  addedTasks: TaskVO[]= [];

  taskCompletedOptions : CompletedOptionVO[] = [
    new CompletedOptionVO(-1, 'All', null),
    new CompletedOptionVO(0, 'Open Tasks', false),
    new CompletedOptionVO(1, 'Completed Tasks', true)
  ];

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
