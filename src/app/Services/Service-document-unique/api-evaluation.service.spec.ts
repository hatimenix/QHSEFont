import { TestBed } from '@angular/core/testing';

import { ApiEvaluationService } from './api-evaluation.service';

describe('ApiEvaluationService', () => {
  let service: ApiEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
