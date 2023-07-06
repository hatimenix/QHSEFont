import { TestBed } from '@angular/core/testing';

import { AxesStrategiquesService } from './axes-strategiques.service';

describe('AxesStrategiquesService', () => {
  let service: AxesStrategiquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxesStrategiquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
