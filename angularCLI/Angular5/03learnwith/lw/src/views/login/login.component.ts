import { Component } from '@angular/core';

import {AuthenticationService} from "../../services/mock/authentication.service";
import {UserModel} from "../../model/UserModel";
import {Router} from "@angular/router";
import {UserVO} from "../../vo/UserVO";

@Component({
    selector: 'login',
    templateUrl : 'login.component.html',
    styleUrls: [ 'login.component.css' ]
})

export class LoginComponent {

    username   = '';
    password   = '';

    usernameError = '';
    passwordError = '';
    loginError = '';

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router ,
        private userModel :UserModel
    ) {}


    onReset(): void {
        console.log('onReset');
        this.username = '';
        this.password = '';
    }
    onLogin(): void {
        console.log('onLogin');
        let errorFound : boolean = false;
        this.loginError = '';

        if ( this.username === '') {
            this.usernameError = 'You Must Enter a Username';
            errorFound = true;
        } else {
            this.usernameError = '';
        }

        if ( this.password === '') {
            this.passwordError = 'You Must Enter a Password';
            errorFound = true;
        } else {
            this.passwordError = '';
        }

        if (errorFound === true) {
            return;
        }

        this.authenticationService.authenticate( this.username, this.password )
            .subscribe(
                result  => {
                    // success code
                    if ( result.error) {
                        this.loginError = 'We could not log you in';
                        return;
                    }
                    this.userModel.user = result.resultObject as UserVO;
                    this.router.navigate(['/tasks']);

                }, error => {
                    // error code
                    this.loginError = 'There was an authentication service error';
                }
            );


    }
}
