import {Component, EventEmitter, OnInit, Output} from "@angular/core";

import {TaskService} from "../../services/mock/task.service";
import {TaskModel} from "../../model/task-model";
import {TaskCategoryVO} from "../../vo/task-category-vo";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css']
})
export class TaskFilterComponent implements OnInit {

  filterError : string;
  completed: String;
  taskFilter: TaskFilterVO = new TaskFilterVO();
  taskCategories : TaskCategoryVO[];
  startDate : NgbDateStruct;
  endDate : NgbDateStruct;
  scheduledStartDate : NgbDateStruct;
  scheduledEndDate : NgbDateStruct;

  @Output() filterRequest = new EventEmitter<TaskFilterVO>();

  constructor(public taskModel :TaskModel, private taskService : TaskService){
  }

  ngOnInit(): void {
    this.completed = 'false';
    this.loadTaskCategories();
  }

  loadTaskCategories():void {
    this.taskService.loadTaskCategories().subscribe(
      result  => {
        if ( result.error) {
          this.filterError = 'Error loading task Categories';
          return;
        }
        this.taskModel.taskCategories = result.resultObject as TaskCategoryVO[];
        this.taskCategories = Object.assign( [], this.taskModel.taskCategories );
        let allTask = new TaskCategoryVO();
        allTask.taskCategoryID = 0;
        allTask.taskCategory = "All Categories";
        this.taskCategories.unshift(allTask);
        this.taskFilter.taskCategoryID = 0;
      },
      error  => {
        this.filterError = 'There was a task category service error';
      }
    );
  };

  filter():void {
    let taskFilter : TaskFilterVO = new TaskFilterVO();
    if (this.startDate) {
      taskFilter.startDate = new Date(this.startDate.year ,
        this.startDate.month-1,
        this.startDate.day
      ) ;
    } else {
      taskFilter.startDate = null;
    }

    if (this.endDate) {
      taskFilter.endDate = new Date(this.endDate.year,
        this.endDate.month-1,
        this.endDate.day) ;
    } else {
      taskFilter.endDate = null;
    }
    if (this.scheduledStartDate) {
      taskFilter.scheduledStartDate = new Date(this.scheduledStartDate.year,
        this.scheduledStartDate.month-1,
        this.scheduledStartDate.day) ;
    } else {
      taskFilter.scheduledStartDate = null;
    }
    if (this.scheduledEndDate) {
      taskFilter.scheduledEndDate = new Date(this.scheduledEndDate.year,
        this.scheduledEndDate.month-1,
        this.scheduledEndDate.day) ;
    } else {
      taskFilter.scheduledEndDate = null;
    }

    if (this.completed === 'null') {
      taskFilter.completed = null;
    } else if (this.completed === 'false') {
      taskFilter.completed = false;
    } else {
      taskFilter.completed = true;
    }

    taskFilter.taskCategoryID = Number(this.taskFilter.taskCategoryID);
    this.filterRequest.emit(taskFilter);

  }


}
