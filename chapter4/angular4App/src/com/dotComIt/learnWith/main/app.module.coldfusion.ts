import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent }  from './app.component';

import {LoginComponent} from "../views/login/login.component";
import {TasksComponent} from "../views/tasks/tasks.component";

import { AppRoutingModule }     from '../nav/routing.module';

import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {UserModel} from "../model/usermodel";
import {AuthenticationService} from "../services/mock/authentication.service";
import {AuthenticationServiceCF} from "../services/coldfusion/authentication.service";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {TaskModel} from "../model/taskmodel";
import {TaskGrid} from "../views/tasks/taskgrid.component";

// chapter 3
import {TaskService} from "../services/mock/task.service";
import {TaskServiceCF} from "../services/coldfusion/task.service";

// chapter 4
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TaskFilter} from "../views/tasks/taskfilter.component";


@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgxDatatableModule,
      NgbModule.forRoot()
  ],
  declarations: [
      AppComponent,
      LoginComponent,
      TasksComponent,
      TaskGrid,
      TaskFilter
  ],
  providers : [
      {provide: LocationStrategy, useClass:HashLocationStrategy},
      UserModel,
      // note: This is some code wrangling not write about in the book but makes reusing code lots easier.
      {provide: AuthenticationService, useClass: AuthenticationServiceCF},
      TaskModel,
      {provide: TaskService, useClass: TaskServiceCF}
  ],
  bootstrap:    [ AppComponent ]

})
export class AppModule { }
