import {UserVO} from "../vo/user-vo";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserModel {
  user!: UserVO;
};
