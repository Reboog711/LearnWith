import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MySharedModule} from "./app.module";
import {AuthenticationService} from "./services/mock/authentication.service";
import {AuthenticationServicePHP} from "./services/php/authentication.service";
import {TaskServicePHP} from "./services/php/task.service";
import {TaskService} from "./services/mock/task.service";


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MySharedModule
  ],
  providers: [
    {provide: AuthenticationService, useClass:AuthenticationServicePHP},
    {provide: TaskService, useClass:TaskServicePHP}
  ],
  bootstrap: [AppComponent]
})
export class AppModulePHP { }

