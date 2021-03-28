import {Component, OnInit, ViewChild} from '@angular/core';

import {TaskVO} from "../../vo/task-vo";
import {TaskModel} from "../../model/task-model";
import {TaskGridComponent} from "../task-grid/task-grid.component";
import {TaskFilterVO} from "../../vo/task-filter-vo";
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  public tasks : TaskVO[];

  @ViewChild(TaskGridComponent, {static: false})
  private taskgrid : TaskGridComponent;


  constructor(private taskModel :TaskModel) { }

  ngOnInit(): void {
  }
  filterRequest(filter:TaskFilterVO):void {
    this.taskgrid.loadTasks(filter);
  }



}
