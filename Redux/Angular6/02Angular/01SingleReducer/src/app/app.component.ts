import { Component } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs/index";
import {NAME_LEFT, NAME_MODIFIED} from "./actions/name.action";
import {helloGoodByeState} from "./reducers/reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // the user input from the name
  nameInput : string;

  // temp storage for the store output for the goodbye
  // saved in the store method, and used in the good bye click method
  goodByeOutput : string;

  // a local instance of the store; used with asyuc to display values in the view.
  storeReturn : Observable<any>;

  // better to create the store with a specific interface than any
  constructor(private store: Store<helloGoodByeState>) {
    this.storeReturn = store.pipe(select('hello'));
    // save the goodbye User output for later use when dispatching goodbye action
    this.storeReturn.subscribe( r =>{
      this.goodByeOutput = (r as helloGoodByeState).helloUser;
    })
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
