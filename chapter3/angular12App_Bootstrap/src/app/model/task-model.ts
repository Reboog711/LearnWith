import {TaskVO} from "../vo/task-vo";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TaskModel {
  tasks! : TaskVO[];
}
