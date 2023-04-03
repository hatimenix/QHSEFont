import { TestBed } from '@angular/core/testing';

import { ServiceRegistreTraitementService } from './service-registre-traitement.service';

describe('ServiceRegistreTraitementService', () => {
  let service: ServiceRegistreTraitementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRegistreTraitementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
