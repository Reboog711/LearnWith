import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
import {AuthenticationService} from "./services/mock/authentication.service";
import {HttpClientModule} from "@angular/common/http";
import { FormsModule }   from '@angular/forms';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { TaskGridComponent } from './views/task-grid/task-grid.component';
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
    HttpClientModule,
    FormsModule,
    NgxDatatableModule,
    NgbModule
  ],
  providers : [
  ],
  exports: [ LoginComponent, TasksComponent]
})
export class MySharedModule {}


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MySharedModule
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
