import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {TaskModel} from "../../model/task-model";
import {TasksService} from "../../services/tasks.service";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TaskVO} from "../../vo/task-vo";
import {Observable, of} from "rxjs";
import { tap} from 'rxjs/operators';


@Component({
  selector: 'app-task-scheduler',
  templateUrl: './task-scheduler.component.html',
  styleUrls: ['./task-scheduler.component.css']
})
export class TaskSchedulerComponent implements OnInit {


  schedulerDate! : NgbDateStruct;
  schedulerError! : string;

  constructor(private taskService :TaskService,
              private tasksService: TasksService,
              public taskModel :TaskModel) {
  }


  ngOnInit(): void {
  }

  onScheduleDateChange():void {
    if (this.schedulerDate.year) {
      let taskFilter: TaskFilterVO = new TaskFilterVO();
      const dateToLoad: Date = new Date(this.schedulerDate.year,
        this.schedulerDate.month - 1,
        this.schedulerDate.day);
      dateToLoad.setHours(0, 0, 0, 0);
      taskFilter.scheduledEqualDateAsUTCString = dateToLoad.toISOString();
      this.loadTasks(taskFilter);
    }
  }

  onTaskUnschedule(task: TaskVO): void {
    if (task.dateScheduledAsUTCString) {
      this.scheduleTasks([task]).subscribe(
        result => {
          this.deleteTaskFromSchedule(task);
        }, error => {
          this.schedulerError = 'We had an error scheduling the tasks.';
        });
    } else {
      this.deleteTaskFromSchedule(task);
    }
  };

  deleteTaskFromSchedule(task: TaskVO): void {
    let itemIndex : number = this.taskModel.scheduledTasks.indexOf(task);
    if (itemIndex >= 0) {
      this.taskModel.scheduledTasks.splice(itemIndex, 1);
    }
    itemIndex = this.taskModel.addedTasks.indexOf(task);
    if (itemIndex >= 0) {
      this.taskModel.addedTasks.splice(itemIndex, 1);
    }
  }

  scheduleTasks(tasks: TaskVO[], schedulerDateAsUTCString? : string): Observable<any>  {
    this.schedulerError = '';
    return this.tasksService.scheduleTaskList(tasks, schedulerDateAsUTCString).pipe(
       tap((result) => {
        for (let scheduledTaskIndex : number = 0;
             scheduledTaskIndex < this.taskModel.scheduledTasks.length;
             scheduledTaskIndex++) {
          for (let masterTaskIndex :number = 0;
               masterTaskIndex < this.taskModel.tasks.length;
               masterTaskIndex++) {
            if (this.taskModel.tasks[masterTaskIndex].taskID === this.taskModel.scheduledTasks[scheduledTaskIndex].taskID) {
              this.taskModel.tasks[masterTaskIndex].dateScheduledAsUTCString = schedulerDateAsUTCString;
              break;
            }
          }
        }
      })
    )
  };

  loadTasks(taskFilter:TaskFilterVO):void {
    this.schedulerError = '';
    this.tasksService.loadTasks(taskFilter).subscribe(
      result  => {
        this.taskModel.scheduledTasks = result;
        this.taskModel.scheduledTasks = this.taskModel.scheduledTasks.concat(this.taskModel.addedTasks);
      }, error => {
        this.schedulerError = 'We had an error loading tasks.';
      }
    );
  }

  initialLoad(schedulerDate : Date): void {
    let taskFilter : TaskFilterVO = new TaskFilterVO();
    taskFilter.scheduledEqualDateAsUTCString = schedulerDate.toISOString();
    this.schedulerDate = {day: schedulerDate.getUTCDate(),
      month: schedulerDate.getUTCMonth() + 1,
      year:  schedulerDate.getUTCFullYear()};
    this.loadTasks(taskFilter);
  }

  onTaskListSchedule() {
    let localDate : string = new Date(this.schedulerDate.year,
      this.schedulerDate.month-1,
      this.schedulerDate.day).toISOString();
    this.scheduleTasks(this.taskModel.scheduledTasks, localDate).subscribe(
      result => {
        this.taskModel.addedTasks = [];
      }, error => {
        this.schedulerError = 'We had an error scheduling the tasks.';
      }
    );
  }





}
