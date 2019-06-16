import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
import {AuthenticationService} from "./services/mock/authentication.service";

import { HttpClientModule } from '@angular/common/http';
import {AuthenticationServicePHP} from "./services/php/authentication.service";
import {UserModel} from "./model/user-model";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TaskModel} from "./model/task-model";

import {TaskService} from "./services/mock/task.service";
import {TaskServicePHP} from "./services/php/task.service";
import {TaskGridComponent} from "./views/task-grid/task-grid.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TaskFilterComponent} from "./views/task-filter/task-filter.component";
import {TaskCuComponent} from "./views/task-cu/task-cu.component";
import {TaskSchedulerComponent} from "./views/task-scheduler/task-scheduler.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent,
    TaskGridComponent,
    TaskFilterComponent,
    TaskCuComponent,
    TaskSchedulerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxDatatableModule,
    NgbModule

  ],
  providers: [
    {provide: AuthenticationService, useClass:AuthenticationServicePHP},
    UserModel,
    TaskModel,
    {provide: TaskService, useClass:TaskServicePHP},
  ],
  bootstrap: [AppComponent],
  entryComponents: [TaskCuComponent]
})
export class AppModulePHP { }
