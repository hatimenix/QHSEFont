import { TestBed } from '@angular/core/testing';

import { ApiEvenementService } from './api-evenement.service';

describe('ApiEvenementService', () => {
  let service: ApiEvenementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEvenementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
