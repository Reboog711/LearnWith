import { TestBed } from '@angular/core/testing';

import { AuthenticationServiceJava } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationServiceJava;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationServiceJava);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
