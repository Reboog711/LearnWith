import { Injectable } from '@angular/core';
import {UserVO} from "../../vo/user-vo";
import {Observable, Observer } from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserServiceMock {

  constructor() { }

  authenticate(username : string, password : string) : Observable<UserVO>  {
    debugger;
    let o : Observable<UserVO> = new Observable(
      (observer : Observer<UserVO>) => {
        setTimeout(() => {
          let result : UserVO = new UserVO();
          if (( username === 'me' ) && ( password === 'me' )) {
            result.userID = 1;
            result.username = "me";
            result.roleID = 1;
            observer.next(result);
          } else if (( username === 'you' ) && ( password === 'you' )) {
            result.userID = 2;
            result.roleID = 2;
            result.username = "you";
            observer.next(result);
          } else {
            const error: any = {};
            error['message'] = 'User Not Authorized';
            const errorResult: HttpErrorResponse = new HttpErrorResponse({error});
            observer.error(errorResult);
          }
          observer.complete();

        }, 1000);
      });
    return o;

  }

}
