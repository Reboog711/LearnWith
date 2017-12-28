/**
 * Created by jhouser on 4/7/2016.
 */

angular.module('learnWith').service('UserModel', [function(){
    var userModel = {
        CREATOR_ROLE : 2,
        isUserInRole : isUserInRole,
        user : {
            userID : 0,
            username : '',
            password : '',
            roleID : 0
        },
        TASKER_ROLE : 1,
        validateUser :validateUser
    }
    return userModel;

    function isUserInRole(roleToCompare){
        if(userModel.user.roleID == roleToCompare){
            return true;
        }
        return false;
    }

    function validateUser(){
        if(userModel.user.userID == 0){
            return false;
        }
        return true;
    }


}]);
