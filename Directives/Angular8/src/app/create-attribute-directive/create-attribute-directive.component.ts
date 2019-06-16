import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-attribute-directive',
  templateUrl: './create-attribute-directive.component.html',
  styleUrls: ['./create-attribute-directive.component.css']
})
export class CreateAttributeDirectiveComponent implements OnInit {

  reversedState = false;

  constructor() { }

  ngOnInit() {
  }

  reverseState() {
    this.reversedState = !this.reversedState;
  }

  onStateChange(event) {
    console.log(event);
  }


}
