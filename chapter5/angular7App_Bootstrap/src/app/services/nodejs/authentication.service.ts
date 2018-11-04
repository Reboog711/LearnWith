import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResultObjectVO} from "../../vo/result-object-vo";
import {Md5} from "ts-md5";
const servicePrefix : string = '/nodejs/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  authenticate(username : string, password : string) : Observable<any> {
    let parameters: string = "username" + '=' + username + '&';
    parameters += "password" + '=' + Md5.hashStr(password);
    let url = servicePrefix + 'login?' + parameters;
    return this.http.get(url);
  }
}

