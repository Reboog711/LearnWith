import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MySharedModule} from "./app.module";
import {AuthenticationServiceCF} from "./services/coldfusion/authentication.service";
import {AuthenticationService} from "./services/mock/authentication.service";

// chapter 2
import {TaskServiceCF} from "./services/coldfusion/task.service";
import {TaskService} from "./services/mock/task.service";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MySharedModule
  ],
  providers: [
    {provide: AuthenticationService, useClass:AuthenticationServiceCF},
    {provide: TaskService, useClass:TaskServiceCF}
  ],
  bootstrap: [AppComponent]
})
export class AppModuleColdFusion { }

