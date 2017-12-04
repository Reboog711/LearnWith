import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "../../model/UserModel";
import {TaskGrid} from "./taskgrid.component";
import {TaskFilterVO} from "../../vo/TaskFilterVO";

@Component({
    selector : 'tasks',
    templateUrl : './com/dotComIt/learnWith/views/tasks/tasks.component.html',
    styleUrls : [ './com/dotComIt/learnWith/views/tasks/tasks.component.css' ]
})

export class TasksComponent implements OnInit {

    @ViewChild(TaskGrid)
    private taskgrid : TaskGrid;


    constructor(private userModel : UserModel, private router : Router) {
    }

    ngOnInit(): void {
        if ( !this.userModel.validateUser()) {
            this.router.navigate(['/login']);
        }
    }

    filterRequest(filter:TaskFilterVO):void {
        this.taskgrid.loadTasks(filter);
    }


}