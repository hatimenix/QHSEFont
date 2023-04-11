import { TestBed } from '@angular/core/testing';

import { ApiProcessusService } from './api-processus.service';

describe('ApiProcessusService', () => {
  let service: ApiProcessusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProcessusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
