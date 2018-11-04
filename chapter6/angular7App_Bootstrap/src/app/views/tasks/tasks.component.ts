import { Component, OnInit, ViewChild } from '@angular/core';
import {TaskGridComponent} from "../task-grid/task-grid.component";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TaskVO} from "../../vo/task-vo";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskCuComponent} from "../task-cu/task-cu.component";
import {TaskSchedulerComponent} from "../task-scheduler/task-scheduler.component";
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @ViewChild(TaskGridComponent)
  private taskgrid : TaskGridComponent;
  @ViewChild(TaskSchedulerComponent)
  private taskscheduler : TaskSchedulerComponent;

  public gridContainerStyle : string = 'horizontal-layout-94';
  public schedulerState : boolean = false;
  public schedulerShowButtonLabel : string = "<";

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  filterRequest(filter:TaskFilterVO):void {
    this.taskgrid.loadTasks(filter);
  }
  newTask() : void {
    this.openTaskWindow('Create a New Task');
  }
  editTask(task:TaskVO) : void {
    this.openTaskWindow('Edit Task', Object.assign( {}, task));
  }

  private openTaskWindow(title:string, task:TaskVO = null) {
    const modalRef = this.modalService.open(TaskCuComponent );
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.task = task;

    modalRef.result.then(
      (result) => {
        if (!task) {
          this.taskgrid.tasks.push(result[0]);
          this.taskgrid.refresh();
        } else {
          for (let index = 0; index < this.taskgrid.tasks.length; ++index) {
            if (this.taskgrid.tasks[index].taskID === result[0].taskID) {
              this.taskgrid.tasks[index].description = result[0].description;
              this.taskgrid.tasks[index].taskCategory = result[0].taskCategory;
              this.taskgrid.tasks[index].taskCategoryID = result[0].taskCategoryID;
              break;
            }
          }
        }


      }
    ).catch(
      (result) => {
      }
    )

  }


  onToggleScheduler(): void {
    if ( this.schedulerState === true) {
      this.schedulerState = this.taskgrid.schedulerState = false;
      this.gridContainerStyle = 'horizontal-layout-94';
      this.schedulerShowButtonLabel = "<";
    } else {
      this.schedulerState = this.taskgrid.schedulerState = true;
      this.gridContainerStyle = 'horizontal-layout-60';
      this.schedulerShowButtonLabel = ">";
      this.taskscheduler.initialLoad(new Date());
    }
    setTimeout(() => this.taskgrid.taskGrid.recalculate(), 100);

  }


}
