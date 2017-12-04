import {Observable} from "rxjs/Observable";

import {AuthenticationService} from "../../../../../../src/com/dotComIt/learnWith/services/mock/authentication.service";
import {ResultObjectVO} from "../../../../../../src/com/dotComIt/learnWith/vo/ResultObjectVO";

describe('Mock Authentication Service', function () {
    let authenticationService : AuthenticationService;

    beforeEach(() => {
        authenticationService = new AuthenticationService();
    });

    it('User Authentication Succeeds', (done: DoneFn) => {
        let o : Observable<ResultObjectVO> = authenticationService.authenticate("me","me");
        o.subscribe(value => {
            expect(value.error).toBe(false);
            expect(value.resultObject.userID).toBe(1);
            expect(value.resultObject.username).toBe("me");
            expect(value.resultObject.role).toBe(1);
            done();
        });


    });

    it('User Authentication Fails', (done: DoneFn) => {
        let o : Observable<ResultObjectVO> = authenticationService.authenticate("no","no");
        o.subscribe(value => {
            expect(value.error).toBe(true);
            expect(value.resultObject).toBeUndefined();
            done();
        });
    });



});
