import {UserVO} from "../vo/UserVO";
import {Injectable} from "@angular/core";

@Injectable()
export class UserModel {
    user : UserVO;

    readonly TASKER_ROLE = 1;
    readonly CREATOR_ROLE = 2;


    validateUser() : boolean {
        if ( !this.user) {
            return false;
        }
        return true;
    }

    isUserInRole(roleToCompare:number):boolean {
        if (!this.user) {
            return false;
        }
        if (this.user.roleID === roleToCompare) {
            return true;
        }
        return false;
    }

};
