import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import {TaskVO} from "../../vo/TaskVO";
import {TaskService} from "../../services/mock/task.service";

import {UserModel} from "../../model/UserModel";
// super weird, but if I put this in upper case like the actual file is
// then I get a StaticInjectorError when running the code
import {TaskModel} from "../../model/taskmodel";

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

    constructor(public userModel : UserModel, private activeModal : NgbActiveModal,
                private taskService : TaskService,
                private taskModel : TaskModel) {
    };

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
