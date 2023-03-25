import {Injectable} from "@angular/core";
import {TaskVO} from "../vo/task-vo";

@Injectable({
  providedIn: 'root'
})
export class TaskModel {
  tasks! : TaskVO[];
};
