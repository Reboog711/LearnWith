import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
import {AuthenticationService} from "./services/mock/authentication.service";
import { HttpClientModule } from '@angular/common/http';
import {AuthenticationServiceNodeJS} from "./services/nodejs/authentication.service";
import {UserModel} from "./model/user-model";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TaskModel} from "./model/task-model";
import {TaskService} from "./services/mock/task.service";
import {TaskServiceNodeJS} from "./services/nodejs/task.service";
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
  providers: [
    {provide: AuthenticationService, useClass:AuthenticationServiceNodeJS},
    UserModel,
    TaskModel,
    {provide: TaskService, useClass:TaskServiceNodeJS},
  ],
  bootstrap: [AppComponent]
})
export class AppModuleNodeJS { }
