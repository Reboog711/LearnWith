import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Md5} from "ts-md5";
import {UserCredentialVO} from "../vo/user-credential-vo";
import {UserVO} from "../vo/user-vo";
import {UserServiceMock} from "./mock/user.service";

const servicePrefix : string = `${environment.serverPrefix}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private userServiceMock: UserServiceMock) { }

  authenticate(username : string, password : string) : Observable<UserVO> {
    if (environment.mockData) {
      return this.userServiceMock.authenticate(username, password);
    }
    let parameters : UserCredentialVO = Object.assign(new UserCredentialVO(), {
      username : username,
      password : Md5.hashStr(password)
    });
    return this.http.post(servicePrefix + 'user/login',
      parameters
    ).pipe(
      map(results => {
        return Object.assign(new UserVO(), results);
      })
    );
  }
}
