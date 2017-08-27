/**
 * Created by jhouser on 4/21/2017.
 */

import { Component } from '@angular/core';
import {UserModel} from "../../model/usermodel";

@Component({
    selector: 'tasks',
    templateUrl : './com/dotComIt/learnWith/views/tasks/tasks.component.html',
    styleUrls: [ './com/dotComIt/learnWith/views/tasks/tasks.component.css' ]
})

export class TasksComponent {

    constructor(private userModel :UserModel) {

        console.log('In Tasks');
        console.log(userModel.user);
    }

}