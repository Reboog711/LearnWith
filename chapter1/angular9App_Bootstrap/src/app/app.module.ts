import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

// just splitting this up to avoid compile errors based on the app choice that loads different modules
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers : [{provide: LocationStrategy, useClass:HashLocationStrategy}],
  exports: [AppComponent]
})
export class MySharedModule {}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MySharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
