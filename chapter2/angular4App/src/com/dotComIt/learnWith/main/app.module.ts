import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent }  from './app.component';

import {LoginComponent} from "../views/login/login.component";
import {TasksComponent} from "../views/tasks/tasks.component";

import { AppRoutingModule }     from '../nav/routing.module';

/*
import { HttpModule }    from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from '../services/mock/in-memory-data-service';*/
import {AuthenticationService} from "../services/mock/authentication.service";
import { FormsModule }   from '@angular/forms';
import {UserModel} from "../model/usermodel";


@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
//    HttpModule,
//    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent
  ],
  providers : [
      {provide: LocationStrategy, useClass:HashLocationStrategy},
      AuthenticationService,
      UserModel
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
