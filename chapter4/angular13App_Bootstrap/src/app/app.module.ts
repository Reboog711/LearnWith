import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
import {UserServiceMock} from "./services/mock/user.service";

// chapter 2
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// chapter 3
import { TaskGridComponent } from './views/task-grid/task-grid.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// chapter 4
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TaskFilterComponent } from './views/task-filter/task-filter.component';
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
  providers: [
    UserServiceMock
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
