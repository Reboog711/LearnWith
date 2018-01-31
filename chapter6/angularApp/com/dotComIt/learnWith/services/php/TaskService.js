/**
 * Created by jhouser on 5/12/2016.
 */

angular.module('learnWith').service('TaskService', ['$http','$filter',function($http,$filter){

    var servicePrefix = '../php/'

    var services = {
        loadTasks : loadTasks,
        loadTaskCategories : loadTaskCategories,
        updateTask : updateTask,
        scheduleTask : scheduleTask,
        scheduleTaskList : scheduleTaskList
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
            url += concatenator + "endDate=" + $filter('date')(taskFilter.endDate, "shortDate");
            concatenator = "&";
        }
        if (taskFilter.scheduledEndDate) {
            url += concatenator + "scheduledEndDate=" + $filter('date')(taskFilter.scheduledEndDate, "shortDate");
            concatenator = "&";
        }
        if (taskFilter.scheduledStartDate) {
            url += concatenator + "scheduledStartDate=" + $filter('date')(taskFilter.scheduledStartDate, "shortDate");
            concatenator = "&";
        }
        if (taskFilter.scheduledEqualDate) {
            url += concatenator + "scheduledEqualDate=" + $filter('date')(taskFilter.scheduledEqualDate, "shortDate");
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



    function createTask_internal(task, user) {
        var parameters = {
            taskCategoryID: task.taskCategoryID,
            description: task.description,
            userID : user.userID
        };

       return $http.post(servicePrefix + 'com/dotComIt/learnWith/api/task/', parameters);
    }

    function updateTask_internal(task) {
        var parameters = {
            taskID: task.taskID,
            taskCategoryID: task.taskCategoryID,
            description: task.description
        }
        return $http.put(servicePrefix + 'com/dotComIt/learnWith/api/task/', parameters);
    }


    function updateTask(taskVO, user){
        console.log((typeof taskVO.taskCategoryID));
        console.log((typeof taskVO.taskCategoryID === 'number' ));
        console.log((typeof taskVO.taskCategoryID == 'number' ));
        if(!(typeof taskVO.taskCategoryID === 'number' )){
            taskVO.taskCategoryID = 0;
        }
        if (taskVO.taskID) {
            return updateTask_internal(taskVO);
        } else {
            return createTask_internal(taskVO, user);
        }

    }

    function scheduleTask(task){
        var parameters = {
            taskID : task.taskID
        };
        if(task.dateScheduled){
            parameters.dateScheduled = task.dateScheduled
        }
        return $http.put(servicePrefix + 'com/dotComIt/learnWith/api/task/schedule/',
            parameters )
    };

    function scheduleTaskList(taskArray, schedulerDate){
        var taskIDList = '';
        for (index = 0; index < taskArray.length; ++index) {
            taskIDList += taskArray[index].taskID + ","
        }
        taskIDList = taskIDList.substr(0,taskIDList.length-1);
        var parameters = {
            taskIDList : taskIDList,
            dateScheduled : $filter('date')(schedulerDate, 'shortDate')
        }
        return $http.put(servicePrefix + 'com/dotComIt/learnWith/api/task/schedule/',
            parameters )
    };

}]);
