import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-use-structural-directive',
  templateUrl: './use-structural-directive.component.html',
  styleUrls: ['./use-structural-directive.component.css']
})
export class UseStructuralDirectiveComponent implements OnInit {

  textHidden = false;

  constructor() { }

  ngOnInit() {
  }

  onToggleText() {
    this.textHidden = !this.textHidden;
  }
}
