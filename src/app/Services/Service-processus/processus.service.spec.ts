import { TestBed } from '@angular/core/testing';

import { ProcessusService } from './processus.service';

describe('ProcessusService', () => {
  let service: ProcessusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
