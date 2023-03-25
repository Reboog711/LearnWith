import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperComponent } from './wrapper.component';
import {CommonModule} from "@angular/common";
import { RouterTestingModule } from '@angular/router/testing';

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CommonModule, WrapperComponent, RouterTestingModule  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
