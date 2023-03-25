import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';

// chapter 2
import {UserServiceMock} from "./services/mock/user.service";
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import {UserService} from "./services/user.service";

// chapter 3
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TaskGridComponent } from './views/task-grid/task-grid.component';

// change 4
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TaskFilterComponent } from './views/task-filter/task-filter.component';
import { TaskCuComponent } from './views/task-cu/task-cu.component';

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
    UserService,
    UserServiceMock
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
