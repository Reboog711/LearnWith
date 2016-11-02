/**
 * Created by jhouser on 4/7/2016.
 */

angular.module('learnWith').service('UserModel', [function(){
    var userModel = {
        user : {
            userID : 0,
            username : '',
            password : '',
            roleID : 0
        }
    }
    return userModel;

}]);
