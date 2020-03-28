import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MySharedModule} from "./app.module";
import {AuthenticationService} from "./services/mock/authentication.service";
import {AuthenticationServiceNodeJS} from "./services/nodejs/authentication.service";


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MySharedModule
  ],
  providers: [
    {provide: AuthenticationService, useClass:AuthenticationServiceNodeJS}
  ],
  bootstrap: [AppComponent]
})
export class AppModuleNodeJS { }

