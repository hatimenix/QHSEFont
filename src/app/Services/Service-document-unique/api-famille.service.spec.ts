import { TestBed } from '@angular/core/testing';

import { ApiFamilleService } from './api-famille.service';

describe('ApiFamilleService', () => {
  let service: ApiFamilleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFamilleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
