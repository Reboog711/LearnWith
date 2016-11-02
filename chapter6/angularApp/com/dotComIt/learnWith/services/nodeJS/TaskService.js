/**
 * Created by jhouser on 6/4/2016.
 */

angular.module('learnWith').service('TaskService', ['$http','SharedUtils','$filter',function($http, sharedUtils,$filter){

    var server = "http://127.0.0.1:8080/";

    var services = {
        loadTasks : loadTasks,
        loadTaskCategories : loadTaskCategories,
        updateTask : updateTask,
        scheduleTask : scheduleTask,
        scheduleTaskList : scheduleTaskList
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

    function updateTask(taskVO, user){
        if(!(typeof taskVO.taskCategoryID === 'number' )){
            taskVO.taskCategoryID = 0;
        }
        var parameters = "taskCategoryID" + "=" + taskVO.taskCategoryID+ '&';
        parameters +=   "description" + "=" + taskVO.description+ '&';
        parameters +=   "callback" + "=" + "JSON_CALLBACK" + '&';
        var method;
        if(taskVO.taskID != 0 ){
            method = "taskService/updateTask";
            parameters += "taskID=" + taskVO.taskID ;
        } else {
            method = "taskService/createTask";
            parameters += "userID=" + user.userID;
        }

        var url = server + method + "?" + parameters;

        return $http.jsonp(url);
    };

    function scheduleTask(task){
        var parameters = "taskID" + "=" + task.taskID+ '&';
        if(task.dateScheduled){
            parameters +=   "dateScheduled" + "=" + task.dateScheduled + '&';
        }
        parameters +=   "callback" + "=" + "JSON_CALLBACK" ;
        var url = server + 'taskService/scheduleTask?' + parameters;
        return $http.jsonp(url)
    };

    function scheduleTaskList(taskArray, schedulerDate){
        var taskIDList = '';
        for (index = 0; index < taskArray.length; ++index) {
            taskIDList += taskArray[index].taskID + ","
        }
        taskIDList = taskIDList.substr(0,taskIDList.length-1);
        var parameters = "taskIDList" + "=" + taskIDList+ '&';
        parameters += "dateScheduled" + "=" + $filter('date')(schedulerDate, 'shortDate') + '&';
        parameters +=   "callback" + "=" + "JSON_CALLBACK" ;
        var url = server + 'taskService/scheduleTaskList?' + parameters;
        return $http.jsonp(url)
    };



}]);
