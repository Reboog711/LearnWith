import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResultObjectVO} from "../../vo/result-object-vo";
import {Md5} from 'ts-md5/dist/md5';

const servicePrefix : string = '/java/webapi/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceJava {

  options : object;

  constructor(private http: HttpClient) {
    let optionHeaders : HttpHeaders = new HttpHeaders().set('Content-Type',
      'application/json');
    this.options = {headers:optionHeaders};
  }

  authenticate(username : string, password : string) : Observable<any> {
    let parameters : object = {
      username : username,
      password : Md5.hashStr(password)
    };
    return this.http.post(servicePrefix + 'login', parameters, this.options );

  }

}
