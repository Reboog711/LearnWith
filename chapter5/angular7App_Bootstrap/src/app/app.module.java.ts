import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {AuthenticationService } from "./services/mock/authentication.service";
import {AuthenticationService as AuthenticationServiceJava} from "./services/java/authentication.service";
import { HttpClientModule } from '@angular/common/http';
import {UserModel} from "./model/usermodel";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TaskModel} from "./model/taskmodel";
import {TaskService} from "./services/mock/task.service";
import {TaskService as TaskServiceJava} from "./services/java/task.service";
import {TaskGridComponent} from "./views/task-grid/task-grid.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TaskFilterComponent} from "./views/task-filter/task-filter.component";
import {TaskCuComponent} from "./views/task-cu/task-cu.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent,
    TaskGridComponent,
    TaskFilterComponent,
    TaskCuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxDatatableModule,
    NgbModule
  ],
  providers : [
    {provide: LocationStrategy, useClass:HashLocationStrategy},
    {provide: AuthenticationService, useClass:AuthenticationServiceJava},
    UserModel,
    TaskModel,
    {provide: TaskService, useClass:TaskServiceJava}

  ],
  bootstrap: [AppComponent],
  entryComponents: [TaskCuComponent]
})
export class AppModuleJava { }
