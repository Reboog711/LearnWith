import {async, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {AuthenticationService} from "../../../../../../src/com/dotComIt/learnWith/services/mock/authentication.service";
import {AuthenticationServiceCF} from "../../../../../../src/com/dotComIt/learnWith/services/coldFusion/authentication.service";

describe('ColdFusion Authentication Service', function () {

    let authenticationService : AuthenticationServiceCF;
    const urlString = '../../coldFusion/com/dotComIt/learnWith/services/AuthenticationService.cfc';
    let httpMock : HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AuthenticationService, useClass: AuthenticationServiceCF }
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
            authenticationService.authenticate('me','me').subscribe(
                value => {
                    expect(value.error).toBeFalsy();
                    expect(value.resultObject.userID).toBe(1);
                    expect(value.resultObject.username).toBe("me");
                    expect(value.resultObject.role).toBe(1);
                });
            const req = httpMock.expectOne(urlString) ;

            expect(req.request.method).toEqual('POST');
            expect(req.request.body).toEqual('username=me&password=ab86a1e1ef70dff97959067b723c5c24&method=authenticate');
            req.flush({"resultObject":{"role":1,"username":"me","userID":1},"error":0});
        });

        it('User Authentication Fails', () => {
            authenticationService.authenticate('wrong','wrong').subscribe(
                value => {
                    expect(value.error).toBeTruthy();
                });
            const req = httpMock.expectOne(urlString) ;
            expect(req.request.method).toEqual('POST');
            expect(req.request.body).toEqual('username=wrong&password=2bda2998d9b0ee197da142a0447f6725&method=authenticate');
            req.flush({"error":1});
        });
    });


    afterEach(() => {
        httpMock.verify();
    });

});
