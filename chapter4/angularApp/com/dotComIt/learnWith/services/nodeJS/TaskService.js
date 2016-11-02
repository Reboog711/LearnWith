/**
 * Created by jhouser on 6/4/2016.
 */

angular.module('learnWith').service('TaskService', ['$http','SharedUtils',function($http, sharedUtils){

    var server = "http://127.0.0.1:8080/";

    var services = {
        loadTasks : loadTasks,
        loadTaskCategories : loadTaskCategories
    }
    return services;

    function loadTasks(taskFilter){
        var parameters = "filter=" + sharedUtils.objToJSONString(taskFilter)+ '&';
        parameters +=   "callback" + "=" + "JSON_CALLBACK" ;
        var url = server + 'taskService/getFilteredTasks?' + parameters;
        return $http.jsonp(url);
    };

    function loadTaskCategories(){
        var parameters = "callback" + "=" + "JSON_CALLBACK" ;
        var url = server + 'taskService/getTaskCategories?' + parameters;
        return $http.jsonp(url)
    };

}]);
