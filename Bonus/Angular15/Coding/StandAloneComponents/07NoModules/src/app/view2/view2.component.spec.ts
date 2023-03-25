import { ComponentFixture, TestBed } from '@angular/core/testing';

import { View2Component } from './view2.component';
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";

describe('View2Component', () => {
  let component: View2Component;
  let fixture: ComponentFixture<View2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CommonModule, View2Component, RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(View2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
