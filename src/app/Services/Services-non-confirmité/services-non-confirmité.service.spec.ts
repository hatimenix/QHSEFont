import { TestBed } from '@angular/core/testing';

import { ServicesNonConfirmitéService } from './services-non-confirmité.service';

describe('ServicesNonConfirmitéService', () => {
  let service: ServicesNonConfirmitéService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesNonConfirmitéService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
