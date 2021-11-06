import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-use-attribute-directive',
  templateUrl: './use-attribute-directive.component.html',
  styleUrls: ['./use-attribute-directive.component.css']
})
export class UseAttributeDirectiveComponent implements OnInit {

  reversedState = false;

  constructor() { }

  ngOnInit() {
  }

  reverseState() {
    this.reversedState = !this.reversedState;
  }
}
