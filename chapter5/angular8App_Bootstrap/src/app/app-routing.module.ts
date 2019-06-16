import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./views/login/login.component";
import {TasksComponent} from "./views/tasks/tasks.component";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {AuthGuard} from "./guards/auth.guard";

const routes : Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'tasks',  component: TasksComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [
    {provide: LocationStrategy, useClass:HashLocationStrategy},
    AuthGuard
  ]
})
export class AppRoutingModule { }
