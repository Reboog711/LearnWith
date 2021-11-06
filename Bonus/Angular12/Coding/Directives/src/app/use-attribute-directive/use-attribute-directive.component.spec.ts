import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseAttributeDirectiveComponent } from './use-attribute-directive.component';

describe('UseAttributeDirectiveComponent', () => {
  let component: UseAttributeDirectiveComponent;
  let fixture: ComponentFixture<UseAttributeDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseAttributeDirectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseAttributeDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
