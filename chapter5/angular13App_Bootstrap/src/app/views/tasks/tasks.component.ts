import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TaskGridComponent} from "../task-grid/task-grid.component";
import {TaskFilterVO} from "../../vo/task-filter-vo";
import {TaskVO} from "../../vo/task-vo";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskCuComponent} from "../task-cu/task-cu.component";
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @ViewChild(TaskGridComponent, {static: false})
  private taskgrid! : TaskGridComponent;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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

  private openTaskWindow(title:string, task:TaskVO | null = null) {
    const modalRef = this.modalService.open(TaskCuComponent );
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.task = task;
    modalRef.result.then(
      (result: TaskVO) => {
        if (!task) {
          this.taskgrid.tasks.push(result);
          this.taskgrid.refresh();
        } else {
          for (let index = 0; index < this.taskgrid.tasks.length; ++index) {
            if (this.taskgrid.tasks[index].taskID === result.taskID) {
              this.taskgrid.tasks[index].description = result.description;
              this.taskgrid.tasks[index].taskCategory = result.taskCategory;
              this.taskgrid.tasks[index].taskCategoryID = result.taskCategoryID;
              break;
            }
          }
        }
      }
    ).catch(
      (error) => {
        // does nothing on purpose
      }
    );


  }


}
