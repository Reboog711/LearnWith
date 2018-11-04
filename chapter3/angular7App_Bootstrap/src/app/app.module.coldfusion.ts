import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {AuthenticationService } from "./services/mock/authentication.service";
import {AuthenticationService as AuthenticationServiceCF} from "./services/coldFusion/authentication.service";
import { HttpClientModule } from '@angular/common/http';
import {UserModel} from "./model/usermodel";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TaskModel} from "./model/taskmodel";
import {TaskService} from "./services/mock/task.service";
import {TaskService as TaskServiceCF} from "./services/coldfusion/task.service";
import {TaskGridComponent} from "./views/task-grid/task-grid.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent,
    TaskGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxDatatableModule
  ],
  providers : [
    {provide: LocationStrategy, useClass:HashLocationStrategy},
    {provide: AuthenticationService, useClass:AuthenticationServiceCF},
    UserModel,
    TaskModel,
    {provide: TaskService, useClass:TaskServiceCF}
  ],
  bootstrap: [AppComponent]
})
export class AppModuleColdFusion { }
