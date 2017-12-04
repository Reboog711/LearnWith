import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "../../model/UserModel";
import {TaskGrid} from "./taskgrid.component";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {TaskVO} from "../../vo/TaskVO";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {TaskCU} from "./taskcu.component";

@Component({
    selector : 'tasks',
    templateUrl : './com/dotComIt/learnWith/views/tasks/tasks.component.html',
    styleUrls : [ './com/dotComIt/learnWith/views/tasks/tasks.component.css' ]
})

export class TasksComponent implements OnInit {

    @ViewChild(TaskGrid)
    private taskgrid : TaskGrid;


    constructor(private userModel : UserModel, private router : Router, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        if ( !this.userModel.validateUser()) {
            this.router.navigate(['/login']);
        }
    }

    filterRequest(filter:TaskFilterVO):void {
        this.taskgrid.loadTasks(filter);
    }

    newTask() : void {
        this.openTaskWindow('Create a New Task');
    }

    private openTaskWindow(title:string, task:TaskVO = null) {
        const modalRef : NgbModalRef = this.modalService.open(TaskCU );
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.task = task;

        modalRef.result.then(
            (result) => {
                if (!task) {
                    this.taskgrid.tasks.push(result[0]);
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
        );


    }

    editTask(task:TaskVO) : void {
        this.openTaskWindow('Edit Task', Object.assign( {}, task));
    }



}