import { Injectable } from '@angular/core';
import {CompletedOptionVO} from "../vo/completed-option-vo";
import {TaskCategoryVO} from "../vo/task-category-vo";
@Injectable({
  providedIn: 'root'
})
export class RefDataModel {
  constructor() { }

  taskCompletedOptions : CompletedOptionVO[] = [
    new CompletedOptionVO(-1, 'All', null),
    new CompletedOptionVO(0, 'Open Tasks', false),
    new CompletedOptionVO(1, 'Completed Tasks', true)
  ];

  taskCategories! : TaskCategoryVO[]

}
