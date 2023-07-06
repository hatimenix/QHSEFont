import { TestBed } from '@angular/core/testing';

import { ExerciceSecuriteService } from './exercice-securite.service';

describe('ExerciceSecuriteService', () => {
  let service: ExerciceSecuriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciceSecuriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
