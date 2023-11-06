import { TestBed } from '@angular/core/testing';

import { TaskHandlingService } from './task-handling.service';

describe('TaskHandlingService', () => {
  let service: TaskHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
