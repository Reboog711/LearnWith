/**
 * Created by jhouser on 4/21/2017.
 */


import { NgModule }      from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import {LoginComponent} from "../views/login/login.component";
import {TasksComponent} from "../views/tasks/tasks.component";


const ROUTES : Routes = [
    { path: 'login',  component: LoginComponent },
    { path: 'tasks',  component: TasksComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
@NgModule({
    imports: [ RouterModule.forRoot(ROUTES) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}