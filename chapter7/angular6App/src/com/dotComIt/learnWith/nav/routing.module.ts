import { NgModule }      from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import {LoginComponent} from "../views/login/login.component";
import {TasksComponent} from "../views/tasks/tasks.component";
import {AuthGuard} from "./auth-guard.service";

const ROUTES : Routes = [
    { path: 'login',  component: LoginComponent },
    { path: 'tasks',  component: TasksComponent, canActivate: [AuthGuard], },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [ RouterModule.forRoot(ROUTES) ],
    exports: [ RouterModule ],
    providers: [AuthGuard],
})

export class AppRoutingModule {}