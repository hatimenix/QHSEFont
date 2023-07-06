import { TestBed } from '@angular/core/testing';

import { ApiArretTravailService } from './api-arret-travail.service';

describe('ApiArretTravailService', () => {
  let service: ApiArretTravailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiArretTravailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
