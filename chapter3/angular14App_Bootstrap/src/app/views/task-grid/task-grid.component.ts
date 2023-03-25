import { Component, OnInit } from '@angular/core';
import {TaskModel} from '../../model/task-model';
import {TaskVO} from "../../vo/task-vo";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TasksService} from "../../services/tasks.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
})
export class TaskGridComponent implements OnInit {

  tasks : TaskVO[] = [];
  taskLoadError :string = '';

  constructor(private taskModel :TaskModel, private tasksService : TasksService) {}

  ngOnInit(): void {
    let taskFilter : TaskFilterVO = new TaskFilterVO();
    taskFilter.completed = false;
    // use this line if you're loading from our docker DB
    taskFilter.startDateAsUTCString = new Date(2021, 6, 12).toISOString();
//    taskFilter.startDateAsUTCString = new Date().toISOString();
    this.loadTasks(taskFilter);

  }

  loadTasks(taskFilter:TaskFilterVO):void{
    debugger;
    this.taskLoadError = '';
    this.tasksService.loadTasks(taskFilter).subscribe({
      next: (result: TaskVO[]) => {
        // result code here
        this.tasks = this.taskModel.tasks = result;
      },
      error: (error: HttpErrorResponse) => {
        // error code here
        this.taskLoadError = 'We had an error loading tasks.';
      }
    });

  }


}
