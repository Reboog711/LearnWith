import {UserVO} from "../../vo/UserVO";
import {ResultObjectVO} from "../../vo/ResultObjectVO";

import {Observer} from 'rxjs/index';
import {Observable} from "rxjs/index";

export class AuthenticationService {

    authenticate(username : string, password : string) :
        Observable<ResultObjectVO>  {
        let o : Observable<ResultObjectVO> = Observable.create(
            (observer : Observer<ResultObjectVO>) => {
                setTimeout(() => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    if (( username === 'me' ) && ( password === 'me' )) {
                        result.error = false;
                        result.resultObject = new UserVO();
                        result.resultObject.userID = 1;
                        result.resultObject.username = "me";
                        result.resultObject.roleID = 1;
                    } else if (( username === 'wife' ) && ( password === 'wife' )) {
                        result.error = false;
                        result.resultObject = new UserVO();
                        result.resultObject.userID = 2;
                        result.resultObject.roleID = 2;
                        result.resultObject.username = "wife";
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
