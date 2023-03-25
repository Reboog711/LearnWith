import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TaskModel} from '../../model/task-model';
import {TaskVO} from "../../vo/task-vo";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TasksService} from "../../services/tasks.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DatatableComponent} from "@swimlane/ngx-datatable";

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

  constructor(private taskModel :TaskModel, private tasksService : TasksService) {}

  ngOnInit(): void {
    let taskFilter : TaskFilterVO = new TaskFilterVO();
    taskFilter.completed = false;
    taskFilter.startDateAsUTCString = new Date().toISOString();
    this.loadTasks(taskFilter);

  }

  loadTasks(taskFilter:TaskFilterVO):void{
    this.taskLoadError = '';
    this.tasksService.loadTasks(taskFilter).subscribe({
    next: (result: TaskVO[])  => {
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


}
