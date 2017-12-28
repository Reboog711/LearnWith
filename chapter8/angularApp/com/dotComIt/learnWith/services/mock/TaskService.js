/**
 * Created by jhouser on 4/8/2016.
 */

angular.module('learnWith').service('TaskService', ['$q','$timeout',function($q,$timeout){

    var services = {
        loadTasks : loadTasks,
        loadTaskCategories : loadTaskCategories,
        updateTask : updateTask,
        scheduleTask : scheduleTask,
        scheduleTaskList : scheduleTaskList,
        completeTask : completeTask
    }

    var taskArray = [
        {"taskCategoryID":2,"taskCategory":"Personal","description":"Get Milk","dateScheduled":"March, 29 2016 00:00:00","dateCompleted":"","taskID":1,"dateCreated":"March, 27 2016 11:42:58","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"Finish Chapter 2","dateScheduled":"March, 29 2016 00:00:00","dateCompleted":"","taskID":2,"dateCreated":"March, 28 2016 11:44:58","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"Plan Chapter 5","dateScheduled":"March, 20 2016 00:00:00","dateCompleted":"","taskID":5,"dateCreated":"March, 28 2016 11:54:40","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"Write Code for Chapter 3","dateScheduled":"March, 29 2016 00:00:00","dateCompleted":"","taskID":3,"dateCreated":"March, 29 2016 11:45:16","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"Write Chapter 4","dateScheduled":"March, 20 2016 00:00:00","dateCompleted":"","taskID":4,"dateCreated":"March, 30 2016 11:54:26","completed":1,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"Learn JQuery","dateScheduled":"","dateCompleted":"","taskID":6,"dateCreated":"March, 31 2016 16:00:23","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"created by Test Harness","dateScheduled":"November, 24 2016 00:00:00","dateCompleted":"","taskID":7,"dateCreated":"May, 09 2016 17:18:00","completed":0,"userID":1},
        {"taskCategoryID":2,"taskCategory":"Personal","description":"This is a test task","dateScheduled":"February, 11 2017 00:00:00","dateCompleted":"","taskID":8,"dateCreated":"May, 09 2016 18:26:10","completed":0,"userID":1},
        {"taskCategoryID":2,"taskCategory":"Personal","description":"This is a test task","dateScheduled":"November, 24 2016 00:00:00","dateCompleted":"","taskID":9,"dateCreated":"May, 09 2016 18:26:28","completed":0,"userID":1},
        {"taskCategoryID":2,"taskCategory":"Personal","description":"This is a test task","dateScheduled":"November, 21 2016 00:00:00","dateCompleted":"","taskID":10,"dateCreated":"May, 09 2016 18:27:06","completed":0,"userID":1},
        {"taskCategoryID":2,"taskCategory":"Personal","description":"Test Task","dateScheduled":"November, 24 2016 00:00:00","dateCompleted":"","taskID":11,"dateCreated":"May, 09 2016 18:33:11","completed":1,"userID":1},
        {"taskCategoryID":2,"taskCategory":"Personal","description":"Task Task 2","dateScheduled":"November, 22 2016 00:00:00","dateCompleted":"","taskID":12,"dateCreated":"May, 09 2016 18:35:07","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"created by Test Harness","dateScheduled":"November, 22 2016 00:00:00","dateCompleted":"","taskID":13,"dateCreated":"May, 14 2016 16:49:06","completed":0,"userID":1},
        {"taskCategoryID":2,"taskCategory":"Personal","description":"New Task for Jeff","dateScheduled":"November, 22 2016 00:00:00","dateCompleted":"","taskID":14,"dateCreated":"May, 27 2016 12:23:42","completed":0,"userID":2},
        {"taskCategoryID":2,"taskCategory":"Personal","description":"New Task for Jeff 2","dateScheduled":"November, 22 2016 00:00:00","dateCompleted":"","taskID":15,"dateCreated":"May, 27 2016 12:23:42","completed":0,"userID":2},
        {"taskCategoryID":1,"taskCategory":"Business","description":"Some Text","dateScheduled":"","dateCompleted":"","taskID":16,"dateCreated":"November, 13 2016 16:42:51","completed":0,"userID":1},
        {"taskCategoryID":"","taskCategory":"","description":"testoring","dateScheduled":"","dateCompleted":"","taskID":17,"dateCreated":"November, 16 2016 12:56:10","completed":1,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"Testoring","dateScheduled":"","dateCompleted":"","taskID":18,"dateCreated":"November, 16 2016 13:04:38","completed":0,"userID":1},
        {"taskCategoryID":2,"taskCategory":"Personal","description":"Testoring 3","dateScheduled":"","dateCompleted":"","taskID":19,"dateCreated":"November, 16 2016 13:06:11","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"Testoring 2","dateScheduled":"","dateCompleted":"","taskID":20,"dateCreated":"November, 16 2016 13:06:49","completed":0,"userID":1},
        {"taskCategoryID":2,"taskCategory":"Personal","description":"Testoring 4","dateScheduled":"","dateCompleted":"","taskID":21,"dateCreated":"November, 16 2016 13:07:01","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"created by Test Harness","dateScheduled":"","dateCompleted":"","taskID":22,"dateCreated":"December, 05 2016 11:50:51","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"created by Test Harness","dateScheduled":"","dateCompleted":"","taskID":23,"dateCreated":"December, 05 2016 11:51:05","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"created by Test Harness","dateScheduled":"","dateCompleted":"","taskID":24,"dateCreated":"December, 05 2016 11:54:26","completed":0,"userID":1},
        {"taskCategoryID":2,"taskCategory":"Personal","description":"This is a test task","dateScheduled":"","dateCompleted":"","taskID":25,"dateCreated":"December, 05 2016 11:54:37","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"created by Test Harness","dateScheduled":"","dateCompleted":"","taskID":26,"dateCreated":"December, 05 2016 16:57:32","completed":1,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"created by Test Harness","dateScheduled":"","dateCompleted":"","taskID":27,"dateCreated":"December, 05 2016 16:58:23","completed":0,"userID":1},
        {"taskCategoryID":2,"taskCategory":"Personal","description":"This is a test task","dateScheduled":"","dateCompleted":"","taskID":28,"dateCreated":"December, 05 2016 16:59:23","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"New Task 2","dateScheduled":"","dateCompleted":"","taskID":29,"dateCreated":"December, 07 2016 11:03:19","completed":1,"userID":0},
        {"taskCategoryID":"","taskCategory":"","description":"test","dateScheduled":"","dateCompleted":"","taskID":30,"dateCreated":"December, 12 2016 12:19:24","completed":1,"userID":1},
        {"taskCategoryID":"","taskCategory":"","description":"New Task 2 2017 Edit","dateScheduled":"","dateCompleted":"","taskID":31,"dateCreated":"February, 11 2017 14:49:39","completed":0,"userID":1}
    ]

    return services;


    function loadTaskCategories(){
        var defer = $q.defer();

        $timeout(function() {
            var result = {};
            result.data = {"resultObject":[
                {"taskCategoryID":1,"taskCategory":"Business"},
                {"taskCategoryID":2,"taskCategory":"Personal"}],
                "error":false}
            defer.resolve(result);
        }, 1000);

        return defer.promise;
    };


    function loadTasks(taskFilter){
        var defer = $q.defer();

        // simulate async function
        $timeout(function() {
            var filteredTaskArray = taskArray.filter(
                function(element, index, array){
                    if(typeof taskFilter.completed != 'undefined'){
                        if(taskFilter.completed != element.completed){
                            return false;
                        }
                    }
                    if(typeof taskFilter.taskCategoryID != 'undefined'){
                        if((taskFilter.taskCategoryID != 0) &&
                            (taskFilter.taskCategoryID != element.taskCategoryID)){
                            return false;
                        }
                    }

                    var createdDate = new Date(element.dateCreated);
                    if(typeof taskFilter.startDate != 'undefined'){
                        var startDate = new Date(taskFilter.startDate);
                        if(startDate > createdDate){
                            if(
                                (startDate.getDate() != createdDate.getDate()) ||
                                (startDate.getMonth() != createdDate.getMonth()) ||
                                (startDate.getYear() != createdDate.getYear())
                            ){
                                return false;
                            }
                        }
                    }
                    if(typeof taskFilter.endDate != 'undefined'){
                        var endDate = new Date(taskFilter.endDate);
                        if(endDate < createdDate){
                            return false;
                        }
                    }
                    var dateScheduled = new Date(element.dateScheduled);
                    if(typeof taskFilter.scheduledStartDate != 'undefined'){
                        date1 = new Date(taskFilter.scheduledStartDate);

                        if(date1 > dateScheduled){
                            // allow equality to still get included
                            if(
                                (date1.getDate() != dateScheduled.getDate()) ||
                                (date1.getMonth() != dateScheduled.getMonth()) ||
                                (date1.getYear() != dateScheduled.getYear())
                            ){
                                return false;
                            }
                        }
                        if(element.dateScheduled == ''){
                            return false;
                        }
                    }
                    if(typeof taskFilter.scheduledEndDate != 'undefined'){
                        date1 = new Date(taskFilter.scheduledEndDate);
                        if(date1 < dateScheduled){
                            return false;
                        }
                        if(element.dateScheduled == ''){
                            return false;
                        }
                    }
                    // added in Chapter 6 to load tasks scheduled for a single day
                    if(typeof taskFilter.scheduledEqualDate != 'undefined'){
                        date1 = new Date(taskFilter.scheduledEqualDate);
                        if(
                            (date1.getDate() != dateScheduled.getDate()) ||
                            (date1.getMonth() != dateScheduled.getMonth()) ||
                            (date1.getYear() != dateScheduled.getYear())
                        ){
                            return false;
                        }
                        if(element.dateScheduled == ''){
                            return false;
                        }
                    }


                    return true;
                }
            );

            var result = {}
            result.data = {
                resultObject:filteredTaskArray,
                error:0
            }

            defer.resolve(result);
        }, 1000);

        return defer.promise;

    }

    function updateTask(task,user){
        var defer = $q.defer();

        $timeout(function() {
            if(task.taskID == 0){
                task.taskID = taskArray[taskArray.length-1].taskID + 1;
                task.dateCreated = new Date();
                taskArray.push(task);
            }
            if(task.taskCategoryID == 1){
                task.taskCategory = 'Business';
            } else if(task.taskCategoryID == 2){
                task.taskCategory = 'Personal';
            } else {
                task.taskCategory = '';
            }
            var result = {};
            result.data = {
                resultObject:[task],
                error:0
            };
            defer.resolve(result);

        }, 1000);

        return defer.promise;
    };


    function scheduleTask(task){
        var defer = $q.defer();

        $timeout(function() {
            result = {};
            result.data = {
                resultObject:[
                    task
                ],
                error:0
            };
            defer.resolve(result);
        }, 1000);

        return defer.promise;
    };

    function scheduleTaskList(taskArray, schedulerDate){
        var defer = $q.defer();

        $timeout(function() {
            result = {};
            result.data = {
                error:0
            };
            defer.resolve(result);
        }, 1000);

        return defer.promise;
    };

    function completeTask(task){
        var defer = $q.defer();

        $timeout(function() {
            task.completed = !task.completed;
            result = {};
            result.data = {
                resultObject:[
                    task
                ],
                error:0.0
            }
            defer.resolve(result);
        }, 1000);

        return defer.promise;
    };

}]);
