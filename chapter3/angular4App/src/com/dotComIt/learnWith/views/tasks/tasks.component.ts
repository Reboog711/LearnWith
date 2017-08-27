/**
 * Created by jhouser on 4/21/2017.
 */

import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../model/usermodel";
import {Router} from "@angular/router";

@Component({
    selector: 'tasks',
    templateUrl : './com/dotComIt/learnWith/views/tasks/tasks.component.html',
    styleUrls: [ './com/dotComIt/learnWith/views/tasks/tasks.component.css' ]
})

export class TasksComponent  implements OnInit {

    constructor(private userModel :UserModel, private router: Router) {

    }

    ngOnInit(): void {
        if ( !this.userModel.validateUser()) {
            this.router.navigate(['/login']);
        }
    }

}