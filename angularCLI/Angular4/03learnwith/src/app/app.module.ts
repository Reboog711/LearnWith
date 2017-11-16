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
import {TaskFilter} from "../views/tasks/taskfilter.component";
import {TaskService} from "../services/mock/task.service";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TaskCU} from "../views/tasks/taskcu.component";
import {TaskScheduler} from "../views/tasks/taskscheduler.component";

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
      // an experiment with replacing services
//      {provide: AuthenticationService, useClass: LoginService},
      AuthenticationService,
      UserModel,
      TaskModel,
      TaskService
  ],
  bootstrap:    [ AppComponent ],
  entryComponents: [TaskCU]
})
export class AppModule { }
