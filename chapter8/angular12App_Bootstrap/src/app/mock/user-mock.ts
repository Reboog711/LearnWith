import {UserVO} from "../vo/user-vo";

export const userMock: UserVO = Object.assign(new UserVO(), {userID:24, username:'me', password: 'me', roleID: 1});
