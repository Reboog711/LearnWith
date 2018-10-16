import { Component, Input, OnInit } from '@angular/core';
import {PersonVO} from "../../vos/person-vo";

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {
  @Input()
  person : PersonVO;

  constructor() { }

  ngOnInit() {
  }

}
