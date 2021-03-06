import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskVO} from "../../vo/TaskVO";
import {TaskService} from "../../services/mock/task.service";
import {TaskModel} from "../../model/taskmodel";
import {UserModel} from "../../model/usermodel";

@Component({
    selector: 'taskcu',
    templateUrl : 'taskcu.component.html',
    styleUrls: [ 'taskcu.component.css' ]
})

export class TaskCU implements OnInit {

    @Input() title : string;
    @Input() task :TaskVO;

    taskUpdateError :string;

    constructor(private activeModal: NgbActiveModal,
                private taskService:TaskService,
                private userModel:UserModel,
                private taskModel:TaskModel) {
    }

    ngOnInit(): void {
        if (!this.task) {
            this.task = new TaskVO();
        }
    };

    onSave():void {
        this.taskUpdateError = '';
        this.taskService.updateTask(this.task, this.userModel.user).subscribe(
            result => {
                if ( result.error) {
                    this.taskUpdateError = 'There was a problem saving the task.';
                    return;
                }
                this.activeModal.close(result.resultObject);

            },
            error => {
                this.taskUpdateError = 'There was a problem saving the task.';
            }
        );
    }




}
