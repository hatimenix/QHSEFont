import { TestBed } from '@angular/core/testing';

import { ApiRealisationService } from './api-realisation.service';

describe('ApiRealisationService', () => {
  let service: ApiRealisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRealisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
