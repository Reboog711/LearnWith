import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
import {AuthenticationService} from "./services/mock/authentication.service";
import {UserModel} from "./model/user-model";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TaskModel} from "./model/task-model";
import { TaskGridComponent } from './views/task-grid/task-grid.component';
import {TaskService} from "./services/mock/task.service";

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
    FormsModule,
    NgxDatatableModule
  ],
  providers: [
    AuthenticationService,
    UserModel,
    TaskModel,
    TaskService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
