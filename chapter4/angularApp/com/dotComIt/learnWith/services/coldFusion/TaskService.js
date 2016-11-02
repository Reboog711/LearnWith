/**
 * Created by jhouser on 5/12/2016.
 */

angular.module('learnWith').service('TaskService', ['$http','$filter','SharedUtils',function($http,$filter,sharedUtils){

    var servicePrefix = '../coldFusion/'

    var services = {
        loadTasks : loadTasks,
        loadTaskCategories : loadTaskCategories
    }
    return services;

    function loadTasks(taskFilter){

        var parameters = {
            method : "getFilteredTasks",
            filter : sharedUtils.objToJSONString(taskFilter)
        }

        return $http.post(servicePrefix + 'com/dotComIt/learnWith/services/TaskService.cfc', parameters)

    };

    function loadTaskCategories(){
        var parameters = {
            method : "getTaskCategories"
        };
        return $http.post(servicePrefix + '/com/dotComIt/learnWith/services/TaskService.cfc', parameters )
    };



}]);
