
import {UserModel} from "../../../../../src/com/dotComIt/learnWith/model/usermodel";
import {UserVO} from "../../../../../src/com/dotComIt/learnWith/vo/UserVO";

describe('User Model', function () {
    let userModel: UserModel;

    beforeEach(() => {
        userModel = new UserModel();
        userModel.user = {userID: 24, username: 'something', password: 'something', role: userModel.TASKER_ROLE} as UserVO
    });

    describe('isUserInRole()', function () {
        it('User is in Role', () => {
            var result :boolean = userModel.isUserInRole(userModel.TASKER_ROLE);
            expect(result).toBeTruthy();
        });

        it('User is not in Role', () => {
            var result :boolean = userModel.isUserInRole(userModel.CREATOR_ROLE);
            expect(result).toBeFalsy();
        });

    });

    describe('validateUser()', function () {
        it('User Logged In', () => {
            var result :boolean = userModel.validateUser();
            expect(result).toBeTruthy();
        });
        it('User Not Logged In', () => {
            userModel.user = null;
            var result :boolean = userModel.validateUser();
            expect(result).toBeFalsy();
        });


    });

});
