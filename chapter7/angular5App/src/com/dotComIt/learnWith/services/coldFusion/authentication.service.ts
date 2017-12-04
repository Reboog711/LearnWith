import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';


import {Md5} from 'ts-md5/dist/md5';

const servicePrefix : string = '../../coldFusion/';

@Injectable()
export class AuthenticationServiceCF {
    options : Object;

    constructor(private http: HttpClient) {
        let optionHeaders : HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        this.options = {headers:optionHeaders};
    }

    authenticate(username : string, password : string) : Observable<any> {
        let parameters : string =  "username" + '=' + username + '&';
        parameters += "password" + '=' + Md5.hashStr(password) + "&";
        parameters += "method" + "=" + "authenticate" ;

        return this.http.post(servicePrefix + 'com/dotComIt/learnWith/services/AuthenticationService.cfc',
            parameters,
            this.options
        );
    };

}

