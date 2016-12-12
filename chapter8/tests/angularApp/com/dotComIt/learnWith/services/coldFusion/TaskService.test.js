/**
 * Created by jhouser on 12/8/2016.
 */

describe('TaskService', function() {

    var TaskService,$httpBackend, sharedUtils,$filter, transformFunction;
    var servicePrefix = '../coldFusion/';
    var taskServiceURL = servicePrefix + 'com/dotComIt/learnWith/services/TaskService.cfc';

    var taskArray = [
        {"taskCategoryID":2,"taskCategory":"Personal","description":"Get Milk","dateScheduled":"March, 29 2016 00:00:00","dateCompleted":"","taskID":1,"dateCreated":"March, 27 2016 11:42:58","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"Finish Chapter 2","dateScheduled":"March, 29 2016 00:00:00","dateCompleted":"","taskID":2,"dateCreated":"March, 28 2016 11:44:58","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"Plan Chapter 5","dateScheduled":"March, 20 2016 00:00:00","dateCompleted":"","taskID":5,"dateCreated":"March, 28 2016 11:54:40","completed":0,"userID":1},
    ]


    beforeEach(module('learnWith'));

    beforeEach(inject(function(_$httpBackend_, _SharedUtils_, _$filter_,_$http_){
        $httpBackend = _$httpBackend_;7
        transformFunction = _$http_.defaults.transformRequest[0]
        sharedUtils = _SharedUtils_;
        $filter = _$filter_;
        _$httpBackend_.whenGET('com/dotComIt/learnWith/views/login/Login.html').respond(200, true);
    }))


    beforeEach(inject(function(_TaskService_){
        TaskService = _TaskService_;
    }));

    describe('loadTaskCategories()', function() {

        it('Success',function(){
            // this does not work
            var parameters = {
                method : "getTaskCategories",
            }
            // this works;
            // most likely because of this parameter list is not getting run through the transform function
            // seems to be no way to access transform function directly through here
//            parameters = "method" + "=" + "getTaskCategories"

            $httpBackend.whenPOST(taskServiceURL, transformFunction(parameters))
                .respond(200,{"resultObject":[
                    {"taskCategoryID":0,"taskCategory":"All Categories"},
                    {"taskCategoryID":1,"taskCategory":"Business"},
                    {"taskCategoryID":2,"taskCategory":"Personal"}],
                    "error":false});

            var response = TaskService.loadTaskCategories();

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject.length).toBe(3);
                expect(response.data.resultObject[0].taskCategoryID).toBe(0);
                expect(response.data.resultObject[0].taskCategory).toBe("All Categories");
            });

            $httpBackend.flush()

        })

    });


    // We don't need to do a ton of test here like we did w/ mock/TaskService.test.js
    describe('loadTasks()', function() {

        it('Load Tasks Success',function(){
            var taskFilter = {
                completed : 1
            }
            var parameters = {
                method : "getFilteredTasks",
                filter : sharedUtils.objToJSONString(taskFilter)
            }

            $httpBackend.whenPOST(taskServiceURL, transformFunction(parameters))
                .respond(200,{"resultObject":taskArray,
                    "error":0});

            var response = TaskService.loadTasks(taskFilter);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject.length).toBe(3);
            });

            $httpBackend.flush()

        })
        it('Load Tasks Fail',function(){
            var taskFilter = {
                completed : 1
            }
            var parameters = {
                method : "getFilteredTasks",
                filter : sharedUtils.objToJSONString(taskFilter)
            }

            $httpBackend.whenPOST(taskServiceURL, transformFunction(parameters))
                .respond(200,{"error":1});

            var response = TaskService.loadTasks(taskFilter);

            response.then(function(response){
                expect(response.data.error).toBeTruthy();
            });

            $httpBackend.flush()

        })

    });

    describe('updateTask()', function() {

        var task,user;
        beforeEach(function(){
            task = {"taskCategoryID":2,"taskID":0};
            user = {userID : 1};
        })

        it('Create Task Success',function(){

            var parameters = {
                method : "createTask",
                taskCategoryID : task.taskCategoryID,
                description : task.description,
                taskID : task.taskID,
                userID : user.userID
            }

            $httpBackend.whenPOST(taskServiceURL, transformFunction(parameters))
                .respond(200,{"error":0, resultObject:[task]});

            var response = TaskService.updateTask(task,user);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                // not gonna do tests against the results; because they aren't changed; since the mock returns the same thing we send in
            });

            $httpBackend.flush()
        })

        // kinda moot w/ the mock services; we're just sending something in and seeing if we get it back
        it('Update Task Fail',function(){
            var parameters = {
                method : "createTask",
                taskCategoryID : task.taskCategoryID,
                description : task.description,
                taskID : task.taskID,
                userID : user.userID
            }

            $httpBackend.whenPOST(taskServiceURL, transformFunction(parameters))
                .respond(200,{"error":1});

            var response = TaskService.updateTask(task,user);

            response.then(function(response){
                expect(response.data.error).toBeTruthy();
                // not gonna do tests against the results; because they aren't changed; since the mock returns the same thing we send in
            });

            $httpBackend.flush()
        })
    });


    describe('scheduleTask()', function() {

        var task;
        beforeEach(function(){
            task = {"taskCategoryID":2,"taskID":0, dateScheduled : new Date()};
        })

        it('Schedule Task Success',function(){

            var parameters = {
                method : "scheduleTask",
                taskID : task.taskID
            };
            if(task.dateScheduled){
                parameters.dateScheduled = task.dateScheduled
            }


            $httpBackend.whenPOST(taskServiceURL, transformFunction(parameters))
                .respond(200,{"error":0, resultObject:[task]});

            var response = TaskService.scheduleTask(task);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                // not gonna do tests against the results; because they aren't changed; since the mock returns the same thing we send in
            });

            $httpBackend.flush()
        })

        // kinda moot w/ the mock services; we're just sending something in and seeing if we get it back
        it('Schedule Task Fail',function(){
            var parameters = {
                method : "scheduleTask",
                taskID : task.taskID
            };
            if(task.dateScheduled){
                parameters.dateScheduled = task.dateScheduled
            }


            $httpBackend.whenPOST(taskServiceURL, transformFunction(parameters))
                .respond(200,{"error":1});

            var response = TaskService.scheduleTask(task);


            response.then(function(response){
                expect(response.data.error).toBeTruthy();
                // not gonna do tests against the results; because they aren't changed; since the mock returns the same thing we send in
            });

            $httpBackend.flush()
        })
    });

    describe('scheduleTaskList()', function() {

        beforeEach(function(){
        })

        it('Schedule Task List Success',function(){

            var schedulerDate =new Date();
            var taskIDList = '';
            for (index = 0; index < taskArray.length; ++index) {
                taskIDList += taskArray[index].taskID + ","
            }
            taskIDList = taskIDList.substr(0,taskIDList.length-1);
            var parameters = {
                method : "scheduleTaskList",
                taskIDList : taskIDList,
                dateScheduled : $filter('date')(schedulerDate, 'shortDate')
            }

            $httpBackend.whenPOST(taskServiceURL, transformFunction(parameters))
                .respond(200,{"error":0});

            var response = TaskService.scheduleTaskList(taskArray, schedulerDate);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                // not gonna do tests against the results; because they aren't changed; since the mock returns the same thing we send in
            });

            $httpBackend.flush()
        })

        // kinda moot w/ the mock services; we're just sending something in and seeing if we get it back
        it('Schedule Task Fail',function(){
            var schedulerDate =new Date();
            var taskIDList = '';
            for (index = 0; index < taskArray.length; ++index) {
                taskIDList += taskArray[index].taskID + ","
            }
            taskIDList = taskIDList.substr(0,taskIDList.length-1);
            var parameters = {
                method : "scheduleTaskList",
                taskIDList : taskIDList,
                dateScheduled : $filter('date')(schedulerDate, 'shortDate')
            }

            $httpBackend.whenPOST(taskServiceURL, transformFunction(parameters))
                .respond(200,{"error":1});

            var response = TaskService.scheduleTaskList(taskArray, schedulerDate);

            response.then(function(response){
                expect(response.data.error).toBeTruthy();
                // not gonna do tests against the results; because they aren't changed; since the mock returns the same thing we send in
            });

            $httpBackend.flush()
        })
    });


    describe('completeTask()', function() {

        var task;
        beforeEach(function(){
            task = {"taskCategoryID":2,"taskID":0, completed : 0};
        })

        it('Make task Completed Success',function(){

            var parameters = {
                method : "completeTask",
                taskID : task.taskID,
                completed : !task.completed
            }

            $httpBackend.whenPOST(taskServiceURL, transformFunction(parameters))
                .respond(200,{"error":0});

            var response = TaskService.completeTask(task);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                // not gonna do tests against the results; because they aren't changed; since the mock returns the same thing we send in
            });

            $httpBackend.flush()
        })
        it('Make task Completed Fail',function(){

            var parameters = {
                method : "completeTask",
                taskID : task.taskID,
                completed : !task.completed
            }

            $httpBackend.whenPOST(taskServiceURL, transformFunction(parameters))
                .respond(200,{"error":1});

            var response = TaskService.completeTask(task);

            response.then(function(response){
                expect(response.data.error).toBeTruthy();
                // not gonna do tests against the results; because they aren't changed; since the mock returns the same thing we send in
            });

            $httpBackend.flush()
        })


    });


});
