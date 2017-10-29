import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent }  from './app.component';

import {LoginComponent} from "../views/login/login.component";
import {TasksComponent} from "../views/tasks/tasks.component";

import { AppRoutingModule }     from '../nav/routing.module';

// chapter 2
import { JsonpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {UserModel} from "../model/usermodel";
import {AuthenticationService} from "../services/mock/authentication.service";
import {AuthenticationServiceNodeJS} from "../services/nodejs/authentication.service";

// chapter 3
import {TaskService} from "../services/mock/task.service";
import {TaskServiceNodeJS} from "../services/nodejs/task.service";
import {TaskModel} from "../model/taskmodel";
import {TaskGrid} from "../views/tasks/taskgrid.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

// chapter 4
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TaskFilter} from "../views/tasks/taskfilter.component";

// chapter 5
import {TaskCU} from "../views/tasks/taskcu.component";

// chapter 6
import {TaskScheduler} from "../views/tasks/taskscheduler.component";

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    JsonpModule,
    NgxDatatableModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent,
    TaskGrid,
    TaskFilter,
    TaskCU,
    TaskScheduler
  ],
  providers : [
      {provide: LocationStrategy, useClass:HashLocationStrategy},
    UserModel,
    // note: This is some code wrangling not written about in the book but makes reusing code lots easier.
    {provide: AuthenticationService, useClass: AuthenticationServiceNodeJS},
    TaskModel,
    {provide: TaskService, useClass: TaskServiceNodeJS }

  ],
  bootstrap:    [ AppComponent ],
  entryComponents: [TaskCU]
})
export class AppModule { }
