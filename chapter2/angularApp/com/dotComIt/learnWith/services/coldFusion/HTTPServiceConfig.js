/**
 * Created by jhouser on 5/10/2016.
 */

angular.module('learnWith').config(['$httpProvider',
    function ($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }
]);
