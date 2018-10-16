import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import {LoginComponent} from "../views/login/login.component";
import { TasksComponent } from "../views/tasks/tasks.component";

import { AppRoutingModule } from '../nav/routing.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
    imports:      [ BrowserModule, AppRoutingModule ],
    declarations: [ AppComponent, LoginComponent, TasksComponent ],
    bootstrap:    [ AppComponent ],
    providers : [{provide: LocationStrategy, useClass:HashLocationStrategy}],
})


export class AppModule { }