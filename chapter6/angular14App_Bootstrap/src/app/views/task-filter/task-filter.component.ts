import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {RefDataModel} from "../../model/ref-data-model";
import {TaskCategoryVO} from "../../vo/task-category-vo";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {TaskCategoriesService} from "../../services/task-categories.service";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css']
})
export class TaskFilterComponent implements OnInit {

  filterError! : string;
  completed!: String;
  taskFilter: TaskFilterVO = new TaskFilterVO();
  taskCategories! : TaskCategoryVO[];
  startDate! : NgbDateStruct;
  endDate! : NgbDateStruct;
  scheduledStartDate! : NgbDateStruct;
  scheduledEndDate! : NgbDateStruct;

  @Output() filterRequest = new EventEmitter<TaskFilterVO>();
  @Output() newTaskRequest = new EventEmitter();

  constructor(public refDataModel :RefDataModel,
              public taskCategoriesService: TaskCategoriesService ){
  }

  loadTaskCategories() {
    this.taskCategoriesService.loadTaskCategories().subscribe({
      next: (result: TaskCategoryVO[]) => {
        this.refDataModel.taskCategories = result;
        this.taskCategories =  [...this.refDataModel.taskCategories];
        let allTask = new TaskCategoryVO();
        allTask.taskCategoryID = 0;
        allTask.taskCategory = "All Categories";
        this.taskCategories.unshift(allTask);
        this.taskFilter.taskCategoryID = 0;

      },
      error: (error: HttpErrorResponse) => {
        this.filterError = 'There was a task category service error';
      }
    })
  }



  ngOnInit(): void {
    this.completed = `false`;
    this.loadTaskCategories();

  }

  filter():void {
    let taskFilter : TaskFilterVO = new TaskFilterVO();
    if (this.startDate) {
      taskFilter.startDateAsUTCString = new Date(this.startDate.year ,
        this.startDate.month-1,
        this.startDate.day
      ).toISOString() ;
    } else {
      taskFilter. startDateAsUTCString = null;
    }
    if (this.endDate) {
      taskFilter.endDateAsUTCString = new Date(this.endDate.year,
        this.endDate.month-1,
        this.endDate.day).toISOString() ;
    } else {
      taskFilter.endDateAsUTCString = null;
    }

    if (this.scheduledStartDate) {
      taskFilter.scheduledStartDateAsUTCString =
        new Date(this.scheduledStartDate.year,
          this.scheduledStartDate.month-1,
          this.scheduledStartDate.day).toISOString() ;
    } else {
      taskFilter.scheduledStartDateAsUTCString = null;
    }
    if (this.scheduledEndDate) {
      taskFilter.scheduledEndDateAsUTCString =
        new Date(this.scheduledEndDate.year,
          this.scheduledEndDate.month-1,
          this.scheduledEndDate.day).toISOString() ;
    } else {
      taskFilter.scheduledEndDateAsUTCString = null;
    }
    if (this.completed === `null`) {
      taskFilter.completed = null;
    } else if (this.completed === `false`) {
      taskFilter.completed = false;
    } else {
      taskFilter.completed = true;
    }
    taskFilter.taskCategoryID = Number(this.taskFilter.taskCategoryID);

    this.filterRequest.emit(taskFilter);

  }

  newTask() : void {
    this.newTaskRequest.emit();
  }



}
