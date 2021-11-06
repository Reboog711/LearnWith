import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStructuralDirectiveComponent } from './create-structural-directive.component';

describe('CreateStructuralDirectiveComponent', () => {
  let component: CreateStructuralDirectiveComponent;
  let fixture: ComponentFixture<CreateStructuralDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStructuralDirectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStructuralDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
