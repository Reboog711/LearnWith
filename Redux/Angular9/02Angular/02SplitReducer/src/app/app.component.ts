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
  nameInput : string;
  goodByeOutput : string;
  nameReturn : Observable<string>;
  goodbyeReturn : Observable<string>;


  constructor(private store: Store<helloGoodByeState>) {
    this.nameReturn = store.pipe(select('helloUser'));
    this.nameReturn.subscribe(r =>{
      this.goodByeOutput = r;
    });
    this.goodbyeReturn = store.pipe(select('goodbyeUser'));
  }


  onNameChange(){
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
