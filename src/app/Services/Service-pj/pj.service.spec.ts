import { TestBed } from '@angular/core/testing';

import { PjService } from './pj.service';

describe('PjService', () => {
  let service: PjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
