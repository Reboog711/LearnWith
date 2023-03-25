import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../model/user-model';
import { UserService } from '../../services/user.service';
import {UserVO} from "../../vo/user-vo";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username   = '';
  password   = '';

  usernameError = '';
  passwordError = '';
  loginError = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private userModel :UserModel
  ) {}

  ngOnInit(): void {
  }

  onReset(): void {
    this.username = '';
    this.password = '';
  }

  onLogin(): void {
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

    this.userService.authenticate( this.username, this.password )
      .subscribe({
          next: (result: UserVO) => {
            // result code
            this.userModel.user = result;
            this.router.navigate(['/tasks']);
          },
          error: (error: HttpErrorResponse) => {
            // error code
            this.loginError = error.error.message;
          }
        }
      );

  }

}
