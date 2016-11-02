/**
 * Created by jhouser on 4/7/2016.
 */

angular.module('learnWith').service('TaskModel', [function(){
    var taskModel = {
        tasks: [],
        taskFilter : {
            completed : 0,
            startDate : new Date("03/01/2016")
        }

    }
    return taskModel;

}]);
