import { Component } from '@angular/core';
import {PersonVO} from "./vos/person-vo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Learn With, Readers';
  person :PersonVO;

  constructor() {
    this.person = new PersonVO;
    this.person.firstName = "LearnWith";
    this.person.lastName = "Users";
  }

}
