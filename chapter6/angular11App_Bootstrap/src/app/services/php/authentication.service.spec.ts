import { TestBed } from '@angular/core/testing';

import { AuthenticationServicePHP } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationServicePHP;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationServicePHP);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
