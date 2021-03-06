import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResultObjectVO} from "../../vo/result-object-vo";
import {Md5} from "ts-md5";

const servicePrefix : string = '/php/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServicePHP {

  options : object;

  constructor(private http: HttpClient) {
    let optionHeaders : HttpHeaders = new HttpHeaders().set('Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8');
    this.options = {headers:optionHeaders};
  }

  authenticate(username : string, password : string) : Observable<any> {
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
