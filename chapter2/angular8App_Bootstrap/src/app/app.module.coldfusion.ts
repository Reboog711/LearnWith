import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
import {AuthenticationService} from "./services/mock/authentication.service";
import { HttpClientModule } from '@angular/common/http';
import {AuthenticationServiceCF} from "./services/coldfusion/authentication.service";
import {UserModel} from "./model/user-model";
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
  providers: [
    {provide: AuthenticationService, useClass:AuthenticationServiceCF},
    UserModel
  ],
  bootstrap: [AppComponent]
})
export class AppModuleColdFusion { }
