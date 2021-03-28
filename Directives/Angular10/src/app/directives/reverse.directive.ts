import {Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';

export class CSSReversedEvent {
  addedCSSClass: string;
  removedCSSClass: string;
}

@Directive({
  selector: '[appReverse]'
})
export class ReverseDirective  implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  private _reversedState = false;
  @Input('appReverse')
  get reversedState() {
    return this._reversedState;
  }
  set reversedState(input) {
    this._reversedState = input;
    this.changeState();
  }

  @Input() regularCSSClass: string;
  @Input() reversedCSSClass: string;

  @Output() stateChange: EventEmitter<CSSReversedEvent> = new EventEmitter();

  ngOnInit() {
    this.changeState();
  }

  changeState() {
    const newState: CSSReversedEvent = new CSSReversedEvent();
    if (this.reversedState) {
      this.renderer.removeClass(this.el.nativeElement, this.regularCSSClass);
      this.renderer.addClass(this.el.nativeElement, this.reversedCSSClass);
      newState.addedCSSClass = this.reversedCSSClass;
      newState.removedCSSClass = this.regularCSSClass;
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.reversedCSSClass);
      this.renderer.addClass(this.el.nativeElement, this.regularCSSClass);
      newState.addedCSSClass = this.regularCSSClass;
      newState.removedCSSClass = this.reversedCSSClass;
    }
    this.stateChange.emit(newState);
  }
}
