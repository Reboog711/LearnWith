import {Injectable} from "@angular/core";
import {UserVO} from "../vo/UserVO";

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
