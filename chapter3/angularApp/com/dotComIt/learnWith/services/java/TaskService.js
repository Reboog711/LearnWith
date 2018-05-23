/**
 * Created by jhouser on 5/12/2016.
 */

angular.module('learnWith').service('TaskService', ['$http','$filter',function($http,$filter){

    var servicePrefix = '/webapi/'

    var services = {
        loadTasks : loadTasks
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

        if ((taskFilter.completed !== null) && (typeof taskFilter.completed !== "undefined")) {
            if(taskFilter.completed){
                url += concatenator + "completed=true";
            } else {
                url += concatenator + "completed=false";
            }
            concatenator = "&";
        }
        if (taskFilter.startDate) {
            url += concatenator + "startDate=" + dateConvert(taskFilter.startDate);
            concatenator = "&";
        }
        return $http.get(url);
    };
}]);
