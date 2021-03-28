import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {Observable} from "rxjs";
import {ResultObjectVO} from "../../vo/result-object-vo";

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should authenticate user', (done: DoneFn) => {
    let o : Observable<ResultObjectVO> = service.authenticate("me","me");
    o.subscribe(value => {
      expect(value.error).toBe(false);
      expect(value.resultObject.userID).toBe(1);
      expect(value.resultObject.username).toBe("me");
      expect(value.resultObject.roleID).toBe(1);
      done();
    });
  });

  it('Should not authenticate user', (done: DoneFn) => {
    let o : Observable<ResultObjectVO> = service.authenticate("no","no");
    o.subscribe(value => {
      expect(value.error).toBe(true);
      expect(value.resultObject).toBeUndefined();
      done();
    });
  });

});
