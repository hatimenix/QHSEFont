import { TestBed } from '@angular/core/testing';

import { ApiTachesService } from './api-taches.service';

describe('ApiTachesService', () => {
  let service: ApiTachesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTachesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
