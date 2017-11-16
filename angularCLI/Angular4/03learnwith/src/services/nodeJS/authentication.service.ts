/**
 * Created by jhouser on 5/11/2017.
 */

import {Injectable} from "@angular/core";
import {Jsonp} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {ResultObjectVO} from "../../vo/ResultObjectVO";
import {Md5} from "ts-md5/dist/md5";

const server : string = 'http://127.0.0.1:8080/';

@Injectable()
export class AuthenticationServiceNodeJS {



    constructor(private jsonp: Jsonp) {
    }

    authenticate(username : string, password : string) : Observable<ResultObjectVO> {
        console.log('in authenticate NodeJS');
        let parameters : string =  "username" + '=' + username + '&';
        parameters += "password" + '=' + Md5.hashStr(password) + "&";
        parameters += "callback" + "=" + "JSONP_CALLBACK";

        let url = server + 'login?' + parameters;

        return this.jsonp.request(url)
            .map((result) => {
                console.log(result);
                return result.json() as ResultObjectVO;
            });

    }
}
