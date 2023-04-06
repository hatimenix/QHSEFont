import { TestBed } from '@angular/core/testing';

import { ApiActionsService } from './api-actions.service';

describe('ApiActionsService', () => {
  let service: ApiActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
