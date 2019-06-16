import {TestBed} from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {Observable} from "rxjs";
import {ResultObjectVO} from "../../vo/result-object-vo";

describe('AuthenticationService', () => {
  let authenticationService : AuthenticationService;

  beforeEach(() => {
    authenticationService = new AuthenticationService()
  });

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('User Authentication Succeeds', (done: DoneFn) => {
    let o : Observable<ResultObjectVO> = authenticationService.authenticate("me","me");
    o.subscribe(value => {
      expect(value.error).toBe(false);
      expect(value.resultObject.userID).toBe(1);
      expect(value.resultObject.username).toBe("me");
      expect(value.resultObject.roleID).toBe(1);
      done();
    });
  });

  it('User Authentication Fails', (done: DoneFn) => {
    let o : Observable<ResultObjectVO> = authenticationService.authenticate("wrong","wrong");
    o.subscribe(value => {
      expect(value.error).toBe(true);
      expect(value.resultObject).toBeUndefined();
      done();
    });

  });
});
