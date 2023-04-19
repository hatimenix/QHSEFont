import { TestBed } from '@angular/core/testing';

import { ApiMesuresService } from './api-mesures.service';

describe('ApiMesuresService', () => {
  let service: ApiMesuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMesuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
