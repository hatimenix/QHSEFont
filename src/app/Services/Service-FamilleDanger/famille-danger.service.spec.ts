import { TestBed } from '@angular/core/testing';

import { FamilleDangerService } from './famille-danger.service';

describe('FamilleDangerService', () => {
  let service: FamilleDangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilleDangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
