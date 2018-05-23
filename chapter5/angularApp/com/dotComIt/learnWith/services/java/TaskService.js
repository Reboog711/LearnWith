/**
 * Created by jhouser on 5/12/2016.
 */

angular.module('learnWith').service('TaskService', ['$http','$filter',function($http,$filter){

    var servicePrefix = '/webapi/'

    var services = {
        loadTasks : loadTasks,
        loadTaskCategories : loadTaskCategories,
        updateTask : updateTask
    }
    return services;

    // Most languages support the date format of mm/dd/yyy but Java is having trouble w/ it
    // so here is a helper date conversion to convert the date string to a new date object
    // then to a 'yyyy-MM-dd, date string
    function dateConvert(dateInput){
        var date;
        if(dateInput instanceof Date){
            date = dateInput;
        } else {
            parts = dateInput.split('/');
            date = new Date('20' + parts[2],parts[0]-1,parts[1]);
        }
        return $filter('date')(date, 'yyyy-MM-dd')
    }

    function loadTasks(taskFilter){
        var url = servicePrefix + 'tasks';
        var concatenator = "?";
        var parts;
        if ((taskFilter.completed !== null) && (typeof taskFilter.completed !== "undefined")) {
            if(taskFilter.completed){
                url += concatenator + "completed=true";
            } else {
                url += concatenator + "completed=false";
            }
            concatenator = "&";
        }
        if (taskFilter.endDate) {
            url += concatenator + "endDate=" + dateConvert(taskFilter.endDate);
            concatenator = "&";
        }
        if (taskFilter.scheduledEndDate) {
            url += concatenator + "scheduledEndDate=" + dateConvert(taskFilter.scheduledEndDate);
            concatenator = "&";
        }
        if (taskFilter.scheduledStartDate) {
            url += concatenator + "scheduledStartDate=" + dateConvert(taskFilter.scheduledStartDate);
            concatenator = "&";
        }
        if (taskFilter.scheduledEqualDate) {
            url += concatenator + "scheduledEqualDate=" + dateConvert(taskFilter.scheduledEqualDate);
            concatenator = "&";
        }
        if (taskFilter.startDate) {
            url += concatenator + "startDate=" + dateConvert(taskFilter.startDate);
            concatenator = "&";
        }
        if (taskFilter.taskCategoryID) {
            url += concatenator + "taskCategoryID=" + taskFilter.taskCategoryID;
            concatenator = "&";
        }
        return $http.get(url);
    };

    function loadTaskCategories(){
        return $http.get(servicePrefix + 'taskCategories' )
    };



    function createTask_internal(task, user) {
        var parameters = {
            taskCategoryID: task.taskCategoryID,
            description: task.description,
            userID : user.userID
        };

        return $http.post(servicePrefix + 'task', parameters);
    }

    function updateTask_internal(task) {
        var parameters = {
            taskID: task.taskID,
            taskCategoryID: task.taskCategoryID,
            description: task.description
        }
        return $http.put(servicePrefix + 'task', parameters);
    }


    function updateTask(taskVO, user){
        if(!(typeof taskVO.taskCategoryID === 'number' )){
            taskVO.taskCategoryID = 0;
        }
        if (taskVO.taskID) {
            return updateTask_internal(taskVO);
        } else {
            return createTask_internal(taskVO, user);
        }

    }

}]);
