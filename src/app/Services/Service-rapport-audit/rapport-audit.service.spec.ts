import { TestBed } from '@angular/core/testing';

import { RapportAuditService } from './rapport-audit.service';

describe('RapportAuditService', () => {
  let service: RapportAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapportAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
