import {Injectable} from "@angular/core";
import {TaskVO} from "../vo/TaskVO";

@Injectable()
export class TaskModel {
    tasks : TaskVO[];
};
