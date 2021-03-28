import {UserModel} from "./user-model";
import {UserVO} from "../vo/user-vo";

describe('User Model', function () {
  let userModel: UserModel;

  beforeEach(() => {
    userModel = new UserModel();
    userModel.user = Object.assign(new UserVO(), {
      userID: 24,
      username: 'something',
      password: 'something',
      roleID: userModel.TASKER_ROLE
    });
  });

  describe('isUserInRole()', function () {
    it('Should return true when User is in Role', () => {
      var result :boolean = userModel.isUserInRole(userModel.TASKER_ROLE);
      expect(result).toBeTruthy();
    });
    it('Should return false when User is not in Role', () => {
      var result :boolean = userModel.isUserInRole(userModel.CREATOR_ROLE);
      expect(result).toBeFalsy();
    });

  });

  describe('validateUser()', function () {
    it('Should return true when User is Logged In', () => {
      var result :boolean = userModel.validateUser();
      expect(result).toBeTruthy();
    });
    it('Should return false when User is Not Logged In', () => {
      userModel.user = null;
      var result :boolean = userModel.validateUser();
      expect(result).toBeFalsy();
    });

  });

});
