/**
 * Created by jhouser on 5/12/2016.
 */

angular.module('learnWith').service('TaskService', ['$http','$filter',function($http,$filter){

    var servicePrefix = '../php/'

    var services = {
        loadTasks : loadTasks,
        loadTaskCategories : loadTaskCategories
    }
    return services;

    function loadTasks(taskFilter){
        var url = servicePrefix + 'com/dotComIt/learnWith/api/tasks/';
        var concatenator = "?";

        if ((taskFilter.completed !== null) && (typeof taskFilter.completed !== "undefined")) {
            url += concatenator + "completed=" + taskFilter.completed;
            concatenator = "&";
        }
        if (taskFilter.endDate) {
            url += concatenator + "endDate=" + $filter('date')(taskFilter.endDate, 'shortDate');
            concatenator = "&";
        }
        if (taskFilter.scheduledEndDate) {
            url += concatenator + "scheduledEndDate=" + $filter('date')(taskFilter.scheduledEndDate, 'shortDate');
            concatenator = "&";
        }
        if (taskFilter.scheduledStartDate) {
            url += concatenator + "scheduledStartDate=" + $filter('date')(taskFilter.scheduledStartDate, 'shortDate');
            concatenator = "&";
        }
        if (taskFilter.startDate) {
            url += concatenator + "startDate=" + $filter('date')(taskFilter.startDate, 'shortDate');
            concatenator = "&";
        }
        if (taskFilter.taskCategoryID) {
            url += concatenator + "taskCategoryID=" + taskFilter.taskCategoryID;
            concatenator = "&";
        }

        return $http.get(url);

    };

    function loadTaskCategories(){
        return $http.get(servicePrefix + 'com/dotComIt/learnWith/api/taskCategories/' )
    };

}]);
