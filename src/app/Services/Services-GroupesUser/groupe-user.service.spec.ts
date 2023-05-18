import { TestBed } from '@angular/core/testing';

import { GroupeUserService } from './groupe-user.service';

describe('GroupeUserService', () => {
  let service: GroupeUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupeUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
