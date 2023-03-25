import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import {EditComponent} from "./edit/edit.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DisplayComponent,
    EditComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
