import {async, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {AuthenticationService} from "../../../../../../src/com/dotComIt/learnWith/services/mock/authentication.service";
import {AuthenticationServiceNodeJS} from "../../../../../../src/com/dotComIt/learnWith/services/nodeJS/authentication.service";
import {Md5} from "ts-md5/dist/md5";

describe('NodeJS Authentication Service', function () {

    const server = 'http://127.0.0.1:8080/';
    const callback : string = 'JSONP_CALLBACK';
    let authenticationService : AuthenticationServiceNodeJS;
    let httpMock : HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AuthenticationService, useClass: AuthenticationServiceNodeJS }
            ] ,
            imports : [HttpClientModule, HttpClientTestingModule]
        });
        TestBed.compileComponents().then(() => {
            authenticationService = TestBed.get(AuthenticationService);
            httpMock = TestBed.get(HttpTestingController);
        });
    }));

    describe('authenticate() ', function () {
        it('User Authentication Succeeds ', () => {
            let username : string = "me";
            let password : string = "me"

            let parameters : string =  "username" + '=' + username + '&';
            parameters += "password" + '=' + Md5.hashStr(password) + "&";
            parameters += "callback" + "=" + callback + "&";
            // callback being added manually in code and also by service, oops
            parameters += "JSONP_CALLBACK" + "=" + callback ;
            let urlString = server + 'login?' + parameters;

            authenticationService.authenticate(username,password).subscribe(
                value => {
                    expect(value.error).toBeFalsy();
                    expect(value.resultObject.userID).toBe(1);
                    expect(value.resultObject.username).toBe("me");
                    expect(value.resultObject.role).toBe(1);
                });


            const req = httpMock.expectOne(urlString) ;

            expect(req.request.method).toEqual('JSONP');
            req.flush({"resultObject":{"role":1,"username":"me","userID":1},"error":0});
        });

        it('User Authentication Fails', () => {
            let username : string = "wrong";
            let password : string = "wrong"

            let parameters : string =  "username" + '=' + username + '&';
            parameters += "password" + '=' + Md5.hashStr(password) + "&";
            parameters += "callback" + "=" + callback + "&";
            // callback being added manually in code and also by service, oops
            parameters += "JSONP_CALLBACK" + "=" + callback ;
            let urlString = server + 'login?' + parameters;
            authenticationService.authenticate(username,password).subscribe(
                value => {
                    expect(value.error).toBeTruthy();
                });
            const req = httpMock.expectOne(urlString) ;
            expect(req.request.method).toEqual('JSONP');
            req.flush({"error":1});
        });
    });


    afterEach(() => {
        httpMock.verify();
    });

});
