import { TestBed } from '@angular/core/testing';

import { ConstatAuditService } from './constat-audit.service';

describe('ConstatAuditService', () => {
  let service: ConstatAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstatAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
