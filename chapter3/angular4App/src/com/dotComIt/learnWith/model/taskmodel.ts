/**
 * Created by jhouser on 4/24/2017.
 */

import {TaskVO} from "../vo/TaskVO";
import {Injectable} from "@angular/core";

@Injectable()
export class TaskModel {
    tasks : TaskVO[];
};
