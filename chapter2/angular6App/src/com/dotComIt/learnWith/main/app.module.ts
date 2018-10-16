import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';

import {LoginComponent} from "../views/login/login.component";
import {TasksComponent} from "../views/tasks/tasks.component";

import { AppRoutingModule } from '../nav/routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';



/// chapter 2
import {AuthenticationService} from '../services/mock/authentication.service';
import {UserModel} from "../model/usermodel";
import { FormsModule }   from '@angular/forms';

@NgModule({
    imports:      [ BrowserModule, AppRoutingModule, FormsModule ],
    declarations: [ AppComponent, LoginComponent, TasksComponent ],
    bootstrap:    [ AppComponent ],
    providers : [{provide: LocationStrategy, useClass:HashLocationStrategy},
                    AuthenticationService,
                UserModel
    ],
})

export class AppModule { }

