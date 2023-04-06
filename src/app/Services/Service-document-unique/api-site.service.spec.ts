import { TestBed } from '@angular/core/testing';

import { ApiSiteService } from './api-site.service';

describe('ApiSiteService', () => {
  let service: ApiSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
