import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "../../model/UserModel";

@Component({
    selector : 'tasks',
    templateUrl : './com/dotComIt/learnWith/views/tasks/tasks.component.html',
    styleUrls : [ './com/dotComIt/learnWith/views/tasks/tasks.component.css' ]
})

export class TasksComponent implements OnInit {

    constructor(private userModel : UserModel, private router : Router) {
    }

    ngOnInit(): void {
        if ( !this.userModel.validateUser()) {
            this.router.navigate(['/login']);
        }
    }

}