import { TestBed } from '@angular/core/testing';

import { FicheserService } from './ficheser.service';

describe('FicheserService', () => {
  let service: FicheserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FicheserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
