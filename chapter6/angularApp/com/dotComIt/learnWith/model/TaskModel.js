/**
 * Created by jhouser on 4/7/2016.
 */

angular.module('learnWith').service('TaskModel', [function(){
    var taskModel = {
        addedTasks : [],
        scheduledTasks : [],
        taskCategories : [],
        taskCategoriesForFilter : [],
        taskCompletedOptions : [
            {"id":-1,"label":"All"},
            {"id":0,"label":"Open Tasks"},
            {"id":1,"label":"Completed Tasks"}
        ],
        taskFilter : {
            completed : 0,
            startDate : new Date("03/01/2016"),
            taskCategoryID : 0
        },
        tasks: []


}
    return taskModel;

}]);
