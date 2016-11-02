/**
 * Created by jhouser on 6/3/2016.
 */

angular.module('learnWith').service('AuthenticationService', ['$http',function($http){

    var server = "http://127.0.0.1:8080/";

    var services = {
        authenticate : authenticate
    }
    return services;

    function authenticate(username, password){
        var parameters =  "username" + '=' + username + '&';
        parameters += "password" +'='+ hex_md5(password) + "&";
        parameters += "callback" + "=" + "JSON_CALLBACK" ;

        var url = server + 'login?' + parameters;
        return $http.jsonp(url)
    };
}]);
