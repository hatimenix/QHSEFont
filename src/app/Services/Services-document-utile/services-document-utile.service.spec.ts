import { TestBed } from '@angular/core/testing';

import { ServicesDocumentUtileService } from './services-document-utile.service';

describe('ServicesDocumentUtileService', () => {
  let service: ServicesDocumentUtileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesDocumentUtileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
