import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {ResultObjectVO} from "../../vo/ResultObjectVO";
import {Md5} from 'ts-md5/dist/md5';
const servicePrefix : string = '../../php/';

@Injectable()
export class AuthenticationServicePHP {
    options : Object;

    constructor(private http: HttpClient) {
        let optionHeaders : HttpHeaders = new HttpHeaders().set('Content-Type',
            'application/x-www-form-urlencoded; charset=UTF-8');
        this.options = {headers:optionHeaders};
    }

    authenticate(username : string, password : string) :
        Observable<any> {

        let parameters : object = {
            username : username,
            password : Md5.hashStr(password)
        };

        return this.http.post(servicePrefix + 'com/dotComIt/learnWith/api/login/',
            parameters,
            this.options
        );

    }

}
