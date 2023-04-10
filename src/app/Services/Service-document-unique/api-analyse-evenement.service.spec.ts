import { TestBed } from '@angular/core/testing';

import { ApiAnalyseEvenementService } from './api-analyse-evenement.service';

describe('ApiAnalyseEvenementService', () => {
  let service: ApiAnalyseEvenementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAnalyseEvenementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
