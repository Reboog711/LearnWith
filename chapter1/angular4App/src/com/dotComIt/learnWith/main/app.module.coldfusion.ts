import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent }  from './app.component';

import {LoginComponent} from "../views/login/login.component";
import {TasksComponent} from "../views/tasks/tasks.component";

import { AppRoutingModule }     from '../nav/routing.module';


@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent
  ],
  providers : [{provide: LocationStrategy, useClass:HashLocationStrategy}],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
