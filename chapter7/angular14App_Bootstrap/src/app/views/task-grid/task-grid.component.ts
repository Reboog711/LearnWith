import {Component, EventEmitter, OnInit, Output, ViewChild}
  from '@angular/core';

import {TaskModel} from '../../model/task-model';
import {TaskVO} from "../../vo/task-vo";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TasksService} from "../../services/tasks.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
})
export class TaskGridComponent implements OnInit {

  tasks : TaskVO[] = [];
  taskLoadError :string = '';
  schedulerState :boolean = false;

  @Output() editTaskRequest = new EventEmitter<TaskVO>();

  @ViewChild(DatatableComponent, {static: false})
  taskGrid!: DatatableComponent;

  constructor(private taskModel :TaskModel,
              private tasksService : TasksService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    let taskFilter : TaskFilterVO = new TaskFilterVO();
    taskFilter.completed = false;
    // use this line if you're loading from our docker DB
    taskFilter.startDateAsUTCString = new Date(2021, 6, 12).toISOString();
//    taskFilter.startDateAsUTCString = new Date().toISOString();
    this.loadTasks(taskFilter);

  }

  loadTasks(taskFilter:TaskFilterVO):void{
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

  onEditTask(value:any) :void {
    this.editTaskRequest.emit(value);
  }

  refresh(){
    this.tasks = [...this.taskModel.tasks];
  }

  onScheduleTaskRequest(task:any):void {
    this.taskModel.onScheduleTaskRequest(task);
  }

  onCompletedCheckBoxChange (task:TaskVO):void {
    this.taskLoadError = '';
    this.taskService.completeTask(task).subscribe({
      next: (result: TaskVO) => {
        this.taskModel.replaceTask(result);
        this.refresh();
      },
      error: (error: HttpErrorResponse) => {
        this.taskLoadError = 'Error completing the task.';
      }
    })
  }


}
