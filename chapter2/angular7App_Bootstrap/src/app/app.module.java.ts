import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {AuthenticationService } from "./services/mock/authentication.service";
import {AuthenticationService as AuthenticationServiceJava} from "./services/java/authentication.service";
import { HttpClientModule } from '@angular/common/http';
import {UserModel} from "./model/usermodel";
import {FormsModule} from "@angular/forms";

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
    {provide: LocationStrategy, useClass:HashLocationStrategy},
    {provide: AuthenticationService, useClass:AuthenticationServiceJava},
    UserModel
  ],
  bootstrap: [AppComponent]
})
export class AppModuleJava { }
