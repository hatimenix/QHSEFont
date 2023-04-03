import { TestBed } from '@angular/core/testing';

import { ServicesDocumentUniqueService } from './services-document-unique.service';

describe('ServicesDocumentUniqueService', () => {
  let service: ServicesDocumentUniqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesDocumentUniqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
