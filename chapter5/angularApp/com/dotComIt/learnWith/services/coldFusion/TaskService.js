/**
 * Created by jhouser on 5/12/2016.
 */

angular.module('learnWith').service('TaskService', ['$http','$filter','SharedUtils',function($http,$filter,sharedUtils){

    var servicePrefix = '../coldFusion/'

    var services = {
        loadTasks : loadTasks,
        loadTaskCategories : loadTaskCategories,
        updateTask : updateTask
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

    function updateTask(taskVO, user){
        var method = "createTask";
        if(taskVO.taskID != 0 ){
            var method = "updateTask";
        }
        if(!(typeof taskVO.taskCategoryID === 'number' )){
            taskVO.taskCategoryID = 0;
        }
        var parameters = {
            method : method,
            taskCategoryID : taskVO.taskCategoryID,
            description : taskVO.description,
            taskID : taskVO.taskID,
            userID : user.userID
        }

        return $http.post(servicePrefix + '/com/dotComIt/learnWith/services/TaskService.cfc', parameters )

    }


}]);
