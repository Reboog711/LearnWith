import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MySharedModule} from "./app.module";
import {AuthenticationService} from "./services/mock/authentication.service";
import {AuthenticationServiceJava} from "./services/java/authentication.service";
import {TaskService} from "./services/mock/task.service";
import {TaskServiceJava} from "./services/java/task.service";


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MySharedModule
  ],
  providers: [
    {provide: AuthenticationService, useClass:AuthenticationServiceJava},
    {provide: TaskService, useClass:TaskServiceJava},

  ],
  bootstrap: [AppComponent]
})
export class AppModuleJava { }

