/**
 * Created by jhouser on 4/21/2017.
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from "../../model/usermodel";
import {Router} from "@angular/router";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {TaskGrid} from "./taskgrid.component";

@Component({
    selector: 'tasks',
    templateUrl : './com/dotComIt/learnWith/views/tasks/tasks.component.html',
    styleUrls: [ './com/dotComIt/learnWith/views/tasks/tasks.component.css' ]
})

export class TasksComponent  implements OnInit {

    @ViewChild(TaskGrid)
    private taskgrid : TaskGrid;

    constructor(private userModel :UserModel, private router: Router) {

    }

    ngOnInit(): void {
        if ( !this.userModel.validateUser()) {
            this.router.navigate(['/login']);
        }
    }

    filterRequest(filter:TaskFilterVO):void {
        console.log('in filter request');
        console.log(filter);
        this.taskgrid.loadTasks(filter);
    }

}