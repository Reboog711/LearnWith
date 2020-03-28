import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {AuthenticationService} from "./services/mock/authentication.service";
import {UserModel} from "./model/user-model";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

// just splitting this up to avoid compile errors based on the app choice that loads different modules
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers : [
    {provide: LocationStrategy, useClass:HashLocationStrategy},
    UserModel
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
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
