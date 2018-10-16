import { Component } from '@angular/core';
import {select, State, Store} from "@ngrx/store";
import {Observable} from "rxjs/index";
import {NAME_LEFT, NAME_MODIFIED} from "./actions/name.action";
import {helloGoodByeState} from "./reducers/reducer";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  nameInput : string;

  goodByeOutput : string;

  nameReturn : Observable<string>;
  goodbyeReturn : Observable<string>;


  // better to create the store with a specific interface than any
  constructor(private store: Store<helloGoodByeState>) {
    this.nameReturn = store.pipe(select('helloUser'));
    this.nameReturn.subscribe(r =>{
      this.goodByeOutput = r;
    });
    this.goodbyeReturn = store.pipe(select('goodbyeUser'));
/*    this.goodbyeReturn.subscribe(r =>{
      console.log(r);
    });*/
  }

  onNameChange(){
    console.log('something');
    this.store.dispatch({
      type: NAME_MODIFIED,
      value : this.nameInput
    });
  }

  onGoodbyeClick(){
    this.store.dispatch({
      type: NAME_LEFT,
      value : this.goodByeOutput
    });

  }

}
