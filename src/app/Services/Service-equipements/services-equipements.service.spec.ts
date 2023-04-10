import { TestBed } from '@angular/core/testing';

import { ServicesEquipementsService } from './services-equipements.service';

describe('ServicesEquipementsService', () => {
  let service: ServicesEquipementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesEquipementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
