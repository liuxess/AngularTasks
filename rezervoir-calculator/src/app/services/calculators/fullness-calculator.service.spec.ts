import { TestBed } from '@angular/core/testing';

import { FullnessCalculatorService } from './fullness-calculator.service';

describe('FullnessCalculatorService', () => {
  let service: FullnessCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullnessCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
