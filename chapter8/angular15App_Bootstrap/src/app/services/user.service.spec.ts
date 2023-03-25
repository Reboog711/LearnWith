import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../environments/environment";
import {userMock} from "../mock/user-mock";
import {UserVO} from "../vo/user-vo";
import {Md5} from "ts-md5";
import {UserCredentialsVO} from "../vo/user-credentials-vo";

describe('UserService', () => {
  const urlString = 'user/login';
  let service: UserService;
  let httpMock : HttpTestingController;

  beforeEach(() => {
    environment.mockData = false;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  beforeEach(()=>{
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('authenticate() ', function () {
    it('should relay to mock service', () => {
      spyOn(service['userServiceMock'], 'authenticate');
      environment.mockData = true;
      service.authenticate('me', 'me');
      expect(service['userServiceMock'].authenticate).toHaveBeenCalledWith('me', 'me');

    })

    it('Should Log User In when Authentication Succeeds', () => {
      const user = Object.assign(new UserVO(), userMock)
      service.authenticate('me','me').subscribe(
        value => {
          expect(value instanceof UserVO).toBeTruthy();
          expect(value.userID).toBe(24);
          expect(value.username).toBe("me");
          expect(value.roleID).toBe(1);
        })
      const req = httpMock.expectOne(urlString);
      const userBody = Object.assign(new UserCredentialsVO(), {
        username : user.username,
        password : Md5.hashStr(user.password)
      });
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(userBody);

      req.flush(user);
    });

    it('User Authentication Fails', () => {
      const username = 'wrong';
      const password = 'wrong'
      service.authenticate(username,password).subscribe(
        value => {
          debugger;
        }, error => {
          debugger;
          expect(error.error.message).toBe('User Not Authorized');
        });
      const req = httpMock.expectOne(urlString);
      const userBody = Object.assign(new UserCredentialsVO(), {
        username : username,
        password : Md5.hashStr(password)
      });
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(userBody);

      const error: any = {};
      error['message'] = 'User Not Authorized';
//      const errorResult: HttpErrorResponse = new HttpErrorResponse({error});

      req.error(error);

    });


  });

  afterEach(() => {
    httpMock.verify();
  });
});
