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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers : [
    UserService,
    UserServiceMock
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
