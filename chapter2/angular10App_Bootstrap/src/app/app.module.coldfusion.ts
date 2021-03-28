import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MySharedModule} from "./app.module";
import {AuthenticationServiceCF} from "./services/coldfusion/authentication.service";
import {AuthenticationService} from "./services/mock/authentication.service";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MySharedModule
  ],
  providers: [
    {provide: AuthenticationService, useClass:AuthenticationServiceCF},
  ],
  bootstrap: [AppComponent]
})
export class AppModuleColdFusion { }

