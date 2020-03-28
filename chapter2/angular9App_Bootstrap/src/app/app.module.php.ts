import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MySharedModule} from "./app.module";
import {AuthenticationService} from "./services/mock/authentication.service";
import {AuthenticationServicePHP} from "./services/php/authentication.service";


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MySharedModule
  ],
  providers: [
    {provide: AuthenticationService, useClass:AuthenticationServicePHP}
  ],
  bootstrap: [AppComponent]
})
export class AppModulePHP { }

