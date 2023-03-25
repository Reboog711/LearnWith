import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskVO} from "../../vo/task-vo";
import {UserModel} from "../../model/user-model";
import {RefDataModel} from "../../model/ref-data-model";
import {TaskService} from "../../services/task.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-task-cu',
  templateUrl: './task-cu.component.html',
  styleUrls: ['./task-cu.component.css']
})
export class TaskCuComponent implements OnInit {

  @Input() title! : string;
  @Input() task! :TaskVO;

  taskUpdateError! :string;

  constructor(public  activeModal: NgbActiveModal,
              public refDataModel: RefDataModel,
              private userModel:UserModel,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    if (!this.task) {
      this.task = new TaskVO();
    }
  };

  onSave():void {
    this.taskUpdateError = '';
    this.task.userID = this.userModel.user.userID;
    this.taskService.updateTask(this.task).subscribe({
      next: (result: TaskVO) => {
        this.activeModal.close(result);
      },
      error: (error: HttpErrorResponse) => {

      }
    }
    );
  }


}
