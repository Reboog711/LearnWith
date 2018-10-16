import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Index";
import {Md5} from 'ts-md5/dist/md5';

const server : string = 'http://127.0.0.1:8080/';
const callback : string = 'JSONP_CALLBACK';

@Injectable()
export class AuthenticationServiceNodeJS {
    constructor(private http: HttpClient) {}


    authenticate(username : string, password : string) : Observable<any> {
        let parameters : string =  "username" + '=' + username + '&';
        parameters += "password" + '=' + Md5.hashStr(password) + "&";
        parameters += "callback" + "=" + callback;

        let url = server + 'login?' + parameters;
        return this.http.jsonp(url,callback);
    }

}
