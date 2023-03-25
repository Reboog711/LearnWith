import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
// approach 1
// compiles fine and works; but IntelliJ gives a map import error 'no exported member'
// past versions of the code used approach 2; but since this actually works I'm switching the book to approach 1
// congrats if you found these comments and thanks for reading.
import {map, Observable} from "rxjs";

// approach 2
// compiles fine and works, but IntelliJ gives errors when using map (not at import stage)
// import {Observable} from "rxjs";
// import {map} from "rxjs/operators";

import {Md5} from "ts-md5";
import {UserCredentialsVO} from "../vo/user-credentials-vo";
import {UserVO} from "../vo/user-vo";
import {environment} from "../../environments/environment";
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
    let parameters: UserCredentialsVO = Object.assign(new UserCredentialsVO(), {
      username: username,
      password: Md5.hashStr(password)
    });

    // approach 1; no compile erros here; this works
        return this.http.post<UserVO>(servicePrefix + 'user/login',
          parameters
        ).pipe(
          // no errors when importing map from rxjs
          map((results: UserVO) => {
            return Object.assign(new UserVO(), results);
          }))

    // approach 2: works as expected
/*    return this.http.post(servicePrefix + 'user/login',
      parameters
    ).pipe(
      map(results => {
        return Object.assign(new UserVO(), results);
      }))*/


  }
}
