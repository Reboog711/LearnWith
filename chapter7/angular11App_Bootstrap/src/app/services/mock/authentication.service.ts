import { Injectable } from '@angular/core';
import {UserVO} from "../../vo/user-vo";
import {ResultObjectVO} from "../../vo/result-object-vo";
import {Observable, Observer } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(username : string, password : string) : Observable<ResultObjectVO>  {
    let o : Observable<ResultObjectVO> = new Observable(
      (observer : Observer<ResultObjectVO>) => {
        setTimeout(() => {
          let result : ResultObjectVO = new ResultObjectVO();
          if (( username === 'me' ) && ( password === 'me' )) {
            result.error = false;
            result.resultObject = new UserVO();
            result.resultObject.userID = 1;
            result.resultObject.username = "me";
            result.resultObject.roleID = 1;
          } else if (( username === 'you' ) && ( password === 'you' )) {
            result.error = false;
            result.resultObject = new UserVO();
            result.resultObject.userID = 2;
            result.resultObject.roleID = 2;
            result.resultObject.username = "you";
          } else {
            result.error = true;
          }
          observer.next(result);
          observer.complete();
        }, 1000);
      });
    return o;

  }

}
