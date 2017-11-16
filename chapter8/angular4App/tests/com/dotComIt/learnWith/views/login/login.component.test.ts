import { async, TestBed,ComponentFixture } from '@angular/core/testing';
import {LoginComponent} from "../../../../../../src/com/dotComIt/learnWith/views/login/login.component";
import {AuthenticationService} from "../../../../../../src/com/dotComIt/learnWith/services/mock/authentication.service";
import {Observable} from "rxjs/Observable";
import {ResultObjectVO} from "../../../../../../src/com/dotComIt/learnWith/vo/ResultObjectVO";
import {Observer} from "rxjs/Observer";
import {UserVO} from "../../../../../../src/com/dotComIt/learnWith/vo/UserVO";
import {UserModel} from "../../../../../../src/com/dotComIt/learnWith/model/usermodel";
import {Router} from "@angular/router";


describe('LoginComponent', function () {
    let fixture: ComponentFixture<LoginComponent>;
    let comp: LoginComponent;
    let authenticationService : AuthenticationService;
    let userModel : UserModel;
    let router: Router;

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            // create components before setting up the router
            // this is an important order of operations beacuse router has issues if the router-outlet component is not defined
            fixture = TestBed.createComponent(LoginComponent);
            authenticationService = TestBed.get(AuthenticationService);
            userModel = TestBed.get(UserModel);
            router =TestBed.get(Router);

            comp = fixture.componentInstance;
        });
    }));

    it('should create component', () => expect(comp).toBeDefined() );

    describe('onReset()', function() {
        it('Values turned to empty strings', function () {
            comp.username = 'username';
            comp.password = 'password';
            comp.onReset();
            expect(comp.username).toBe('');
            expect(comp.password).toBe('');
        });
    });
    describe('onLogin()', function() {
        it('No Username', function () {
            comp.username = '';
            comp.password = '';
            comp.onLogin();
            expect(comp.usernameError).toBe('You Must Enter a Username');
        });
        it('No Password', function () {
            comp.username = '';
            comp.password = '';
            comp.onLogin();
            expect(comp.passwordError).toBe('You Must Enter a Password');
        });
        it('Failure', function () {
            comp.username = 'me';
            comp.password = 'me';
            let result : ResultObjectVO = new ResultObjectVO();
            result.error = false;
            let o : Observable<ResultObjectVO>;
            spyOn(authenticationService, 'authenticate').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = true;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.onLogin();
            expect(comp.loginError).toBe('We could not log you in');
        });

        it('Success', function () {
            comp.username = 'me';
            comp.password = 'me';
            spyOn(router,'navigate').and.returnValue({});

            spyOn(authenticationService, 'authenticate').and.returnValue(
                Observable.create((observer : Observer<ResultObjectVO>) => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.error = false;
                    result.resultObject = new UserVO();
                    result.resultObject.userID = 1;
                    result.resultObject.username = "me";
                    result.resultObject.role = 1;
                    observer.next(result);
                    observer.complete();
                })
            );
            comp.onLogin();
            expect(comp.loginError).toBe('');
            expect(userModel.user.userID).toBe(1);
            expect(userModel.user.username).toBe("me");
            expect(userModel.user.role).toBe(1);
            expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
        });
    });
});
