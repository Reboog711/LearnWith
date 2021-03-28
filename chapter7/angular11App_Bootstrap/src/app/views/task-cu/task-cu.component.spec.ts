import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCuComponent } from './task-cu.component';

describe('TaskCuComponent', () => {
  let component: TaskCuComponent;
  let fixture: ComponentFixture<TaskCuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
