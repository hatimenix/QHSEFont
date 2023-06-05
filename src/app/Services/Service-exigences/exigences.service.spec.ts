import { TestBed } from '@angular/core/testing';

import { ExigencesService } from './exigences.service';

describe('ExigencesService', () => {
  let service: ExigencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExigencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
