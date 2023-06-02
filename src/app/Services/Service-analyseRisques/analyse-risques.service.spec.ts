import { TestBed } from '@angular/core/testing';

import { AnalyseRisquesService } from './analyse-risques.service';

describe('AnalyseRisquesService', () => {
  let service: AnalyseRisquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyseRisquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
