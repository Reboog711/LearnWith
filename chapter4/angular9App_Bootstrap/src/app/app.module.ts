import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
// chapter 2
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {AuthenticationService} from "./services/mock/authentication.service";
import {UserModel} from "./model/user-model";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

// chapter 3
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {TaskModel} from "./model/task-model";
import { TaskGridComponent } from './views/task-grid/task-grid.component';
import {TaskService} from "./services/mock/task.service";

// chapter 3
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TaskFilterComponent } from './views/task-filter/task-filter.component';

// just splitting this up to avoid compile errors based on the app choice that loads different modules
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent,
    TaskGridComponent,
    TaskFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxDatatableModule,
    NgbModule
  ],
  providers : [
    {provide: LocationStrategy, useClass:HashLocationStrategy},
    UserModel,
    TaskModel
  ],
  exports: [AppComponent]
})
export class MySharedModule {}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MySharedModule,
    FormsModule
  ],
  providers: [
    AuthenticationService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
