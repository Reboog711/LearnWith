import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TaskModel} from '../../model/task-model';
import {TaskVO} from "../../vo/task-vo";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TaskService} from "../../services/mock/task.service";
import {DatatableComponent} from "@swimlane/ngx-datatable";
@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
})
export class TaskGridComponent implements OnInit {

  public tasks : TaskVO[] = [];
  public taskLoadError :string = '';
  schedulerState :boolean = false;

  @ViewChild(DatatableComponent, {static: false})
  taskGrid!: DatatableComponent;

  @Output() editTaskRequest = new EventEmitter<TaskVO>();

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
    this.taskService.completeTask(task).subscribe(
      result  => {
        if ( result.error ) {
          this.taskLoadError = 'Error completing the task.';
          return;
        }
        this.taskModel.replaceTask(result.resultObject[0]);
        this.refresh();
      }, error => {
        this.taskLoadError = 'Error completing the task.';
      }
    );
  }

}
