/**
 * Created by jhouser on 5/12/2016.
 */

angular.module('learnWith').service('TaskService', ['$http','$filter',function($http,$filter){

    var servicePrefix = '../php/'

    var services = {
        loadTasks : loadTasks
    }
    return services;

    function loadTasks(taskFilter){
        var url = servicePrefix + 'com/dotComIt/learnWith/api/tasks/';
        var concatenator = "?";

        if ((taskFilter.completed !== null) && (typeof taskFilter.completed !== "undefined")) {
            url += concatenator + "completed=" + taskFilter.completed;
            concatenator = "&";
        }
        if (taskFilter.startDate) {
            url += concatenator + "startDate=" + $filter('date')(taskFilter.startDate, 'shortDate');
            concatenator = "&";
        }
        return $http.get(url);
    };
}]);
