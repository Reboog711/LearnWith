/**
 * Created by jhouser on 4/21/2017.
 */

import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/mock/authentication.service";
import {Router} from "@angular/router";
import {UserModel} from "../../model/usermodel";
import {UserVO} from "../../vo/UserVO";

@Component({
    selector: 'login',
    templateUrl : './com/dotComIt/learnWith/views/login/login.component.html',
    styleUrls: [ './com/dotComIt/learnWith/views/login/login.component.css' ]
})

export class LoginComponent {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private userModel :UserModel
    ) {
    }
    username   = '';
    password   = '';
    usernameError = '';
    passwordError = '';
    loginError = '';


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


        this.authenticationService.authenticate( this.username, this.password ).subscribe(
            result  => {
                console.log('user return');
                console.log(result);
                if ( result.error ) {
                    //                    alert("We could not log you in");
                    this.loginError = 'We could not log you in';
                    return;
                }
                // probably want to do something to save user to some app global provider / global service
                // than redirect
                this.userModel.user = result.resultObject as UserVO;
                console.log(this.userModel.user);
                this.router.navigate(['/tasks']);
            }, error => {
                console.log(error);
                console.log('authentication service error');
                this.loginError = 'There was an authentication service error';
            }
        );
    }

    onLoginAsMe = function onLoginAsMe(){
        this.username = 'me';
        this.password = 'me';
        this.onLogin();
    };

    onLoginAsWife = function onLoginAsMe(){
        this.username = 'wife';
        this.password = 'wife';
        this.onLogin();
    };

}