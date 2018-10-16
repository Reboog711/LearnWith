import {UserVO} from "../vo/UserVO";
import {Injectable} from "@angular/core";

@Injectable()
export class UserModel {
    user : UserVO;

    validateUser() : boolean {
        if ( !this.user) {
            return false;
        }
        return true;
    }

};
