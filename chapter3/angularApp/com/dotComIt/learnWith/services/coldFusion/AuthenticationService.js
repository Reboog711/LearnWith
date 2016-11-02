/**
 * Created by jhouser on 5/10/2016.
 */

angular.module('learnWith').service('AuthenticationService', ['$http',function($http){

    var servicePrefix = '../coldFusion/'

    var services = {
        authenticate : authenticate
    }
    return services;

    function authenticate(username, password){
        var parameters =  "username" + '=' + username + '&';
        parameters += "password" +'='+ hex_md5(password) + "&";
        parameters += "method" + "=" + "authenticate" ;

        return $http.post(servicePrefix + 'com/dotComIt/learnWith/services/AuthenticationService.cfc', parameters)

    };
}]);
