import { Injectable }     from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { UserModel } from "../model/usermodel";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private userModel: UserModel) {}

    canActivate() {
        if(this.userModel.validateUser()){
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}