import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttributeDirectiveComponent } from './create-attribute-directive.component';

describe('CreateAttributeDirectiveComponent', () => {
  let component: CreateAttributeDirectiveComponent;
  let fixture: ComponentFixture<CreateAttributeDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAttributeDirectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAttributeDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
