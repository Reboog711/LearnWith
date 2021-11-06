import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appReverse01]'
})
export class Reverse01Directive {
  constructor(private el: ElementRef) { }

  private _reversedState = false;
  @Input('appReverse01')
  get reversedState() {
    return this._reversedState;
  }
  set reversedState(input) {
    this._reversedState = input;
    this.changeState();
  }

  changeState() {
    if (this.reversedState) {
            this.el.nativeElement.style.backgroundColor = '#000000';
            this.el.nativeElement.style.color = '#ffffff';
    } else {
            this.el.nativeElement.style.backgroundColor = '#ffffff';
            this.el.nativeElement.style.color = '#000000';
    }
  }
}
