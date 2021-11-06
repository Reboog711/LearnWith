import { TestBed } from '@angular/core/testing';

import { UserServiceMock } from './user.service';
import {UserVO} from "../../vo/user-vo";
import {Observable} from "rxjs";

describe('UserServiceMock', () => {
  let service: UserServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServiceMock);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should authenticate user', (done: DoneFn) => {
    let o : Observable<UserVO> = service.authenticate("me","me");
    o.subscribe(value => {
      expect(value.userID).toBe(1);
      expect(value.username).toBe("me");
      expect(value.roleID).toBe(1);
      done();
    });
  });
  it('Should authenticate user you/you', (done: DoneFn) => {
    let o : Observable<UserVO> = service.authenticate("you","you");
    o.subscribe(value => {
      expect(value.userID).toBe(2);
      expect(value.username).toBe("you");
      expect(value.roleID).toBe(2);
      done();
    });
  });
  it('Should not authenticate user', (done: DoneFn) => {
    let o : Observable<UserVO> = service.authenticate("me","no");
    o.subscribe(value => {
    }, (error) => {
      expect(error.error.message).toBe('User Not Authorized');
      done();
    });
  });


});
