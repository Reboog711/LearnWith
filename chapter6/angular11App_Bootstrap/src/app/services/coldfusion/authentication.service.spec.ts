import { TestBed } from '@angular/core/testing';

import { AuthenticationServiceCF } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationServiceCF;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationServiceCF);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
