/**
 * Created by jhouser on 4/22/2017.
 */

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
        if (this.user.role === roleToCompare) {
            return true;
        }
        return false;
    }
};
