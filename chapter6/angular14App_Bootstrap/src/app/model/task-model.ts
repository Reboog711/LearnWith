import {TaskVO} from "../vo/task-vo";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: `root`
})
export class TaskModel {
  tasks! : TaskVO[];
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

};

