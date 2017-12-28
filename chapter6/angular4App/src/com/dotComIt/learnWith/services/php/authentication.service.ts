import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {ResultObjectVO} from "../../vo/ResultObjectVO";
import {Md5} from "ts-md5/dist/md5";


const servicePrefix : string = '../../php/';

@Injectable()
export class AuthenticationServicePHP {
    options : RequestOptions = new RequestOptions();

    constructor(private http: Http) {
        let optionHeaders : Headers = new Headers();
        optionHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        this.options = new RequestOptions({headers:optionHeaders});
    }

    authenticate(username : string, password : string) : Observable<ResultObjectVO> {

        let parameters : object = {
            username : username,
            password : Md5.hashStr(password)
        };

        return this.http.post(servicePrefix + 'com/dotComIt/learnWith/api/login/',
            parameters, this.options)
            .map((result) => result.json());
    };

}

