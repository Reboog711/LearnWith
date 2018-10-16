import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {StoreModule} from "@ngrx/store";
import {goodbyeUserReducer, helloUserReducer } from "./reducers/reducer";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      helloUser: helloUserReducer,
      goodbyeUser :goodbyeUserReducer
    }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
