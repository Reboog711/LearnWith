import { Component, OnInit } from '@angular/core';

import {TaskVO} from "../../vo/task-vo";
import {TaskModel} from "../../model/task-model";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  public tasks : TaskVO[];

  constructor(private taskModel :TaskModel) { }

  ngOnInit(): void {
  }

}
