import { TestBed } from '@angular/core/testing';

import { ServiceFicheRestaurationService } from './service-fiche-restauration.service';

describe('ServiceFicheRestaurationService', () => {
  let service: ServiceFicheRestaurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFicheRestaurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
