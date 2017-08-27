/**
 * Created by jhouser on 4/24/2017.
 */

import {TaskVO} from "../vo/TaskVO";
import {CompletedOptionVO} from "../vo/CompletedOptionVO";
import {TaskCategoryVO} from "../vo/TaskCategoryVO";
import {Injectable} from "@angular/core";

@Injectable()
export class TaskModel {
    tasks : TaskVO[];

    taskCompletedOptions : CompletedOptionVO[] = [
        new CompletedOptionVO(-1, 'All', null),
        new CompletedOptionVO(0, 'Open Tasks', false),
        new CompletedOptionVO(1, 'Completed Tasks', true)
    ];

    taskCategories : TaskCategoryVO[];

};
