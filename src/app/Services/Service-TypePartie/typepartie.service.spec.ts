import { TestBed } from '@angular/core/testing';

import { TypepartieService } from './typepartie.service';

describe('TypepartieService', () => {
  let service: TypepartieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypepartieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
