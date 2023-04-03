import { TestBed } from '@angular/core/testing';

import { ServiceCommandesService } from './service-commandes.service';

describe('ServiceCommandesService', () => {
  let service: ServiceCommandesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCommandesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
