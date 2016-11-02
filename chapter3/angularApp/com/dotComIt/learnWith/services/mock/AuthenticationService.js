/**
 * Created by jhouser on 4/7/2016.
 */

angular.module('learnWith').service('AuthenticationService', ['$q','$timeout',function($q,$timeout){

    var services = {
        authenticate : authenticate
    }
    return services;

    function authenticate(username, password){
        var defer = $q.defer();

        // simulate async function
        $timeout(function() {
            var result = {};
            if((username == 'me') && (password == 'me')){
                result.data= {"resultObject":{"role":1,"username":"me","userID":1},"error":0};
            } else if((username == 'wife') && (password == 'wife')){
                result.data = {"resultObject":{"role":2,"username":"wife","userID":2},"error":0};
            } else {
                result.data = {"error":1};
            }
            defer.resolve(result);
        }, 1000);

        return defer.promise;

    }

}]);
