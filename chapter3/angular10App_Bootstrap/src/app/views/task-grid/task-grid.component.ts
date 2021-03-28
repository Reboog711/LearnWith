import { Component, OnInit } from '@angular/core';
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TaskModel} from "../../model/task-model";
import {TaskService} from "../../services/mock/task.service";
import {TaskVO} from "../../vo/task-vo";

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
})
export class TaskGridComponent implements OnInit {
  public tasks : TaskVO[];
  public taskLoadError :string = '';

  constructor(private taskModel :TaskModel, private taskService : TaskService) {}

  ngOnInit(): void {
    let taskFilter : TaskFilterVO = new TaskFilterVO();
    taskFilter.completed = false;
    taskFilter.startDate = new Date('3/1/2017');
    this.loadTasks(taskFilter);
  }

  loadTasks(taskFilter:TaskFilterVO):void{
    this.taskLoadError = '';
    this.taskService.loadTasks(taskFilter).subscribe(
      result  => {
        // result code here
        if ( result.error ) {
          this.taskLoadError = 'We could not load any tasks.';
          return;
        }
        this.tasks = this.taskModel.tasks = result.resultObject as TaskVO[];
      },
      error => {
        // error code here
        this.taskLoadError = 'We had an error loading tasks.';
      }
    );

  }

}
