import { TestBed } from '@angular/core/testing';

import { TaskCategoriesService } from './task-categories.service';

describe('TaskCategoriesService', () => {
  let service: TaskCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
