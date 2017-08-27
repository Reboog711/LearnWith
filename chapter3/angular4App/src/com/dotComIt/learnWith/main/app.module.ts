import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent }  from './app.component';

import {LoginComponent} from "../views/login/login.component";
import {TasksComponent} from "../views/tasks/tasks.component";

import { AppRoutingModule }     from '../nav/routing.module';

import {AuthenticationService} from "../services/mock/authentication.service";
import { FormsModule }   from '@angular/forms';
import {UserModel} from "../model/usermodel";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {TaskModel} from "../model/taskmodel";
import {TaskGrid} from "../views/tasks/taskgrid.component";
import {TaskService} from "../services/mock/task.service";


@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxDatatableModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent,
    TaskGrid
  ],
  providers : [
      {provide: LocationStrategy, useClass:HashLocationStrategy},
      AuthenticationService,
      UserModel,
      TaskModel,
      TaskService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
