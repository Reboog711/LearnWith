/**
 * Created by jhouser on 4/28/2017.
 */

import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskVO} from "../../vo/TaskVO";
import {TaskService} from "../../services/mock/task.service";
import {TaskModel} from "../../model/taskmodel";
import {UserModel} from "../../model/usermodel";

@Component({
    selector: 'taskcu',
    templateUrl : './com/dotComIt/learnWith/views/tasks/taskcu.component.html',
    styleUrls: [ './com/dotComIt/learnWith/views/tasks/taskcu.component.css' ]
})

export class TaskCU implements OnInit {

    @Input()
    title : string;

    @Input()
    task :TaskVO;

    taskUpdateError :string;

    constructor(private activeModal: NgbActiveModal, private taskService:TaskService, private taskModel:TaskModel,
                private userModel :UserModel) {
    }

    ngOnInit(): void {
        if (!this.task) {
            this.task = new TaskVO;
        }
    };

    onSave():void {
        this.taskUpdateError = '';
        // call save method in TaskService
        this.taskService.updateTask(this.task, this.userModel.user).subscribe(
            (result) => {
                if ( result.error ) {
                    this.taskUpdateError = 'There was a problem saving the task.';
                    return;
                }
                this.activeModal.close(result.resultObject);
            },
            (error) => {
                console.log('Something Failed');
                this.taskUpdateError = 'There was a problem saving the task.';
            }
        );
    }
}