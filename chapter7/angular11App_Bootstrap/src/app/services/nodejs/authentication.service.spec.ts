import { TestBed } from '@angular/core/testing';

import { AuthenticationServiceNodeJS } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationServiceNodeJS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationServiceNodeJS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
