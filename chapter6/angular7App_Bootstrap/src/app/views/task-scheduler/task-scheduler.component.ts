import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/mock/task.service";
import {TaskVO} from "../../vo/task-vo";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {TaskModel} from "../../model/taskmodel";
import {TaskFilterVO} from "../../vo/task-filter-vo";


@Component({
  selector: 'app-task-scheduler',
  templateUrl: './task-scheduler.component.html',
  styleUrls: ['./task-scheduler.component.css']
})
export class TaskSchedulerComponent implements OnInit {

  schedulerDate : NgbDateStruct;
  schedulerError : string;


  constructor(private taskService: TaskService, private taskModel: TaskModel) { }

  ngOnInit() {
  }
  onScheduleDateChange():void {
    if (this.schedulerDate.year) {
      let taskFilter : TaskFilterVO = new TaskFilterVO();
      taskFilter.scheduledEqualDate = new Date(this.schedulerDate.year, this.schedulerDate.month-1, this.schedulerDate.day);
      this.loadTasks(taskFilter);
    }

  }
  onTaskUnschedule(task: TaskVO): void {
    if (task.dateScheduled) {
      task.dateScheduled = null;
      this.scheduleTask(task);
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
  scheduleTask(task:TaskVO): void {
    this.schedulerError = '';
    this.taskService.scheduleTask(task).subscribe(
      result => {
        if (result.error) {
          this.schedulerError = 'We could not remove the task from the schedule.';
          return;
        }
        this.taskModel.replaceTask(result.resultObject[0]);
        for (let index : number = 0; index < this.taskModel.scheduledTasks.length;
             ++index) {
          if (this.taskModel.scheduledTasks[index].taskID ===
            result.resultObject[0].taskID) {
            this.deleteTaskFromSchedule(this.taskModel.scheduledTasks[index]);
          }
        }
      }, error => {
        this.schedulerError = 'We had an error scheduling the tasks.';
      }
    );
  };


  loadTasks(taskFilter:TaskFilterVO):void {
    this.schedulerError = '';
    this.taskService.loadTasks(taskFilter).subscribe(
      result  => {
        if ( result.error) {
          this.schedulerError = 'We could not load any tasks.';
          return;
        }
        this.taskModel.scheduledTasks = result.resultObject as TaskVO[];
        this.taskModel.scheduledTasks = this.taskModel.scheduledTasks.concat(this.taskModel.addedTasks);
      }, error => {
        this.schedulerError = 'We had an error loading tasks.';
      }
    );
  }

  initialLoad(schedulerDate : Date): void {
    let taskFilter : TaskFilterVO = new TaskFilterVO();
    taskFilter.scheduledEqualDate = schedulerDate;
    this.schedulerDate = {day: taskFilter.scheduledEqualDate.getUTCDate(),
      month: taskFilter.scheduledEqualDate.getUTCMonth() + 1,
      year: taskFilter.scheduledEqualDate.getUTCFullYear()};
    this.loadTasks(taskFilter);
  }

  onTaskListSchedule() {
    let localDate : Date = new Date(this.schedulerDate.year, this.schedulerDate.month-1, this.schedulerDate.day);
    this.taskService.scheduleTaskList(this.taskModel.scheduledTasks,
      localDate)
      .subscribe(
        result => {
          if (result.error) {
            this.schedulerError = 'We had an error scheduling all the tasks.';
            return;
          }
          for (let scheduledTaskIndex : number = 0;
               scheduledTaskIndex < this.taskModel.scheduledTasks.length;
               scheduledTaskIndex++) {
            for (let masterTaskIndex :number = 0;
                 masterTaskIndex < this.taskModel.tasks.length;
                 masterTaskIndex++) {
              if (this.taskModel.tasks[masterTaskIndex].taskID ===
                this.taskModel.scheduledTasks[scheduledTaskIndex].taskID) {
                this.taskModel.tasks[masterTaskIndex].dateScheduled = localDate;
                break;
              }
            }
          }
          this.taskModel.addedTasks = [];
        }, error => {
          this.schedulerError = 'We had an error scheduling all the tasks.';
        }
      );
  }

}
