import { TestBed } from '@angular/core/testing';

import { ApiDangerService } from './api-danger.service';

describe('ApiDangerService', () => {
  let service: ApiDangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
