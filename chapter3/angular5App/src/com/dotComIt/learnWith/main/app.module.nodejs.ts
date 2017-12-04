import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import {LoginComponent} from "../views/login/login.component";
import { TasksComponent } from "../views/tasks/tasks.component";

import { AppRoutingModule } from '../nav/routing.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// chapter 2
import {AuthenticationService} from "../services/mock/authentication.service";
import {AuthenticationServiceNodeJS} from "../services/nodeJS/authentication.service";
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {UserModel} from "../model/UserModel";

import { FormsModule }   from '@angular/forms';

// chapter 3
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {TaskModel} from "../model/taskmodel";
import {TaskGrid} from "../views/tasks/taskgrid.component";

import {TaskService} from "../services/mock/task.service";
import {TaskServiceNodeJS} from "../services/nodejs/task.service";

@NgModule({
    imports:      [ BrowserModule, AppRoutingModule, HttpClientJsonpModule, HttpClientModule, FormsModule, NgxDatatableModule   ],
    declarations: [ AppComponent, LoginComponent, TasksComponent, TaskGrid ],
    bootstrap:    [ AppComponent ],
    providers : [{provide: LocationStrategy, useClass:HashLocationStrategy},
        {provide: AuthenticationService, useClass:AuthenticationServiceNodeJS},
        UserModel,
        TaskModel,
        {provide: TaskService, useClass:TaskServiceNodeJS}
    ],
})

export class AppModule { }