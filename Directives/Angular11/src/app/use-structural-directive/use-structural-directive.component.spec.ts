import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseStructuralDirectiveComponent } from './use-structural-directive.component';

describe('UseStructuralDirectiveComponent', () => {
  let component: UseStructuralDirectiveComponent;
  let fixture: ComponentFixture<UseStructuralDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseStructuralDirectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseStructuralDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
