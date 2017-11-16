import { Component } from '@angular/core';
import {PersonVo} from "./vos/person-vo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  person :PersonVo;

  constructor() {
    this.person = new PersonVo;
    this.person.firstName = "LearnWith";
    this.person.lastName = "Users";
  }
}
