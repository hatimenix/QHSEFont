import { TestBed } from '@angular/core/testing';

import { PlanalimentaireService } from './planalimentaire.service';

describe('PlanalimentaireService', () => {
  let service: PlanalimentaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanalimentaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
