import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appReverse02]'
})
export class Reverse02Directive {
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  private _reversedState = false;
  @Input('appReverse02')
  get reversedState() {
    return this._reversedState;
  }
  set reversedState(input) {
    this._reversedState = input;
    this.changeState();
  }


  changeState() {
    if (this.reversedState) {
      this.renderer.removeClass(this.el.nativeElement, 'regular');
      this.renderer.addClass(this.el.nativeElement, 'reversed');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'reversed');
      this.renderer.addClass(this.el.nativeElement, 'regular');
    }
  }
}
