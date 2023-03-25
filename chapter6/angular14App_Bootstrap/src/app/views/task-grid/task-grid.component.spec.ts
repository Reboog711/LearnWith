import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGridComponent } from './task-grid.component';

describe('TaskGridComponent', () => {
  let component: TaskGridComponent;
  let fixture: ComponentFixture<TaskGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
