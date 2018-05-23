/**
 * Created by jhouser on 5/10/2016.
 */

angular.module('learnWith').service('AuthenticationService', ['$http',function($http){

    var servicePrefix = '/webapi/'

    var services = {
        authenticate : authenticate
    }
    return services;

    function authenticate(username, password){
        var parameters = object = {
            username : username,
            password : hex_md5(password)
        };

        return $http.post(servicePrefix + 'login', parameters)
    };
}]);
