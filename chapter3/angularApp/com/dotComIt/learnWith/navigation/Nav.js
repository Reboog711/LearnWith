/**
 * Created by jhouser on 4/7/2016.
 */

angular.module('learnWith').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/login',
            {templateUrl:'com/dotComIt/learnWith/views/login/Login.html',
                controller: 'LoginCtrl'})
            .when('/tasks',
                {templateUrl: 'com/dotComIt/learnWith/views/tasks/MainScreen.html',
                    controller: 'MainScreenCtrl'})
            .otherwise({redirectTo: '/login'});
    }
]);

