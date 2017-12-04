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

};
