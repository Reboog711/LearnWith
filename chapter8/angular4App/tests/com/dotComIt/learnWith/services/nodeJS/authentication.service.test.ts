// console.log('nodejs.authentication.service.tests');

import {Observable} from "rxjs/Observable";
import { async, TestBed} from '@angular/core/testing';
import { JsonpModule, JSONPBackend, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {AuthenticationService} from   "../../../../../../src/com/dotComIt/learnWith/services/mock/authentication.service";
import {AuthenticationServiceNodeJS} from "../../../../../../src/com/dotComIt/learnWith/services/nodeJS/authentication.service";
import {ResultObjectVO} from "../../../../../../src/com/dotComIt/learnWith/vo/ResultObjectVO";
import {UserVO} from "../../../../../../src/com/dotComIt/learnWith/vo/UserVO";

describe('NodeJS Authentication Service', function () {
    let authenticationService : AuthenticationServiceNodeJS;
    let mockBackend : MockBackend;

    beforeEach(async(() => {
        // first we want to replace the default AuthenticationService set up in the base.spec with the ColdFusion one
        // could use overrideProvider in theory, but not available in the version I'm using
        TestBed.configureTestingModule({
            providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceNodeJS },
                { provide: JSONPBackend, useClass: MockBackend }
            ],
            imports : [JsonpModule]
        });

        TestBed.compileComponents().then(() => {
            authenticationService = TestBed.get(AuthenticationService);
            mockBackend = TestBed.get(JSONPBackend);
        });
    }));

    describe('authenticate() ', function () {
        let mockResponse : ResultObjectVO;

        beforeEach(() => {
            mockResponse = new ResultObjectVO();
            mockResponse.error = false;
            mockResponse.resultObject = new UserVO();
            mockResponse.resultObject.userID = 1;
            mockResponse.resultObject.username = "me";
            mockResponse.resultObject.role = 1;

        });


        it('User Authentication Succeeds', () => {

            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })

            let o : Observable<ResultObjectVO> = authenticationService.authenticate("me","me");
            o.subscribe(value => {
                expect(value.error).toBe(false);
                expect(value.resultObject.userID).toBe(1);
                expect(value.resultObject.username).toBe("me");
                expect(value.resultObject.role).toBe(1);
            });
        });
        it('User Authentication Fails', () => {
            mockResponse.error = true;

            mockBackend.connections.subscribe( (connection:any ) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            })

            let o : Observable<ResultObjectVO> = authenticationService.authenticate("wrong","wrong");
            o.subscribe(value => {
                expect(value.error).toBe(true);
            });
        });
    });
});