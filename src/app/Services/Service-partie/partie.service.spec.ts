import { TestBed } from '@angular/core/testing';

import { PartieService } from './partie.service';

describe('PartieService', () => {
  let service: PartieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
