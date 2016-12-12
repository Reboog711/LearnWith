/**
 * Created by jhouser on 12/7/2016.
 */

describe('MainScreenCtrl', function() {

    var $scope, $location, controller, taskService, $q, loadTaskCategoriesDeferred, UserModel,$uibModal, TaskModel;

    var sharedTaskArray = [
        {"taskCategoryID":2,"taskCategory":"Personal","description":"Get Milk","dateScheduled":"March, 29 2016 00:00:00","dateCompleted":"","taskID":1,"dateCreated":"March, 27 2016 11:42:58","completed":0,"userID":1},
        {"taskCategoryID":1,"taskCategory":"Business","description":"Finish Chapter 2","dateScheduled":"March, 29 2016 00:00:00","dateCompleted":"","taskID":2,"dateCreated":"March, 28 2016 11:44:58","completed":0,"userID":1},
    ];


    beforeEach(module('learnWith'));

    beforeEach(inject(function(_$httpBackend_){
        _$httpBackend_.whenGET('com/dotComIt/learnWith/views/tasks/MainScreen.html').respond(200, true);
        _$httpBackend_.whenGET('com/dotComIt/learnWith/views/login/Login.html').respond(200, true);

        // this is triggered when mocking ColdFusion tests; so mocking this here too even for non CF based tests
        _$httpBackend_.whenPOST('../coldFusion/com/dotComIt/learnWith/services/TaskService.cfc').respond(200, true);

        // for when running NodeJS tasks
        _$httpBackend_.when('JSONP','http://127.0.0.1:8080/taskService/getFilteredTasks?filter={"completed":"0","startDate":"03/01/2016","taskCategoryID":"0"}&callback=JSON_CALLBACK').respond(200, true);

    }))




    beforeEach(inject(function($controller, $rootScope, _$location_, _$filter_,_$timeout_, _$uibModal_, _UserModel_, _TaskModel_, _TaskService_, _$q_ ){
        $scope = $rootScope.$new();
        $location = _$location_;
        taskService = _TaskService_;
        UserModel =  _UserModel_;
        TaskModel = _TaskModel_;
        $q = _$q_;
        $uibModal = _$uibModal_

        loadTaskCategoriesDeferred = $q.defer();
        spyOn(taskService, 'loadTaskCategories').and.returnValue(loadTaskCategoriesDeferred.promise);
        spyOn(window, 'alert');


        spyOn(UserModel, 'validateUser').and.returnValue(true);

        controller = $controller('MainScreenCtrl', {
            '$scope' : $scope,
            '$location' : _$location_,
            '$filter' : _$filter_,
            '$timeout' : _$timeout_,
            '$uibModal' : _$uibModal_,
            'UserModel' : _UserModel_,
            'TaskModel' : _TaskModel_,
            'TaskService' : _TaskService_
        });

    }));

    // used to run init
    describe('run onInit()', function(){

        beforeEach(function(){
        })

        it('Load Tasks Categories Success', function(){

            var taskCategories =[
                {"taskCategoryID":0,"taskCategory":"All Categories"},
                {"taskCategoryID":1,"taskCategory":"Business"},
                {"taskCategoryID":2,"taskCategory":"Personal"}]
            loadTaskCategoriesDeferred.resolve({data : {"resultObject": taskCategories,"error":0}})

            $scope.$apply();

            console.log($scope.taskModelWrapper.taskModel.taskCategories);

            expect($scope.taskModelWrapper.taskModel.taskCategories).toBe(taskCategories);
        })

        it('Load Tasks Categories Fail', function(){

            loadTaskCategoriesDeferred.resolve({data : {"error":1}})

            $scope.$apply();

            console.log($scope.taskModelWrapper.taskModel.taskCategories);

            expect(window.alert).toHaveBeenCalledWith('We could not load the task categories')
        })

        it('Load Tasks Categories Service Fail', function(){

            loadTaskCategoriesDeferred.reject({
                data : "Something Bad Happened"
            })

            $scope.$apply();

            console.log($scope.taskModelWrapper.taskModel.taskCategories);

            expect(window.alert).toHaveBeenCalledWith('Something Bad Happened')
        })

    });

    describe('onFilterRequest()', function(){

        var loadTasksDeferred;
        beforeEach(function(){
            loadTasksDeferred = $q.defer()
            spyOn(taskService, 'loadTasks').and.returnValue(loadTasksDeferred.promise);
        })


        it('Load Tasks Success', function(){
            // just setting some properties for proof of principle
            $scope.taskModelWrapper.taskModel.taskFilter.completed = 1;
            $scope.taskModelWrapper.taskModel.taskFilter.startDate = new Date("03/01/2016");

            // just choosing any two tasks from the
            var taskResult = sharedTaskArray;
            loadTasksDeferred.resolve({
                data : {"resultObject":taskResult,"error":0}
            });

            $scope.onFilterRequest();
            $scope.$apply();

            expect($scope.taskModelWrapper.taskModel.tasks.length).toBe(2);
            expect($scope.taskModelWrapper.taskModel.tasks).toBe(taskResult);
        })

        it('Load Tasks Fail', function(){
            // just setting some properties for proof of principle
            $scope.taskModelWrapper.taskModel.taskFilter.completed = 1;
            $scope.taskModelWrapper.taskModel.taskFilter.startDate = new Date("03/01/2016");

            // just choosing any two tasks from the
            loadTasksDeferred.resolve({
                data : {"error":1}
            });

            $scope.onFilterRequest();
            $scope.$apply();

            expect(window.alert).toHaveBeenCalledWith('We could not load the task data')
        })


        it('Load Tasks Service Error', function(){
            // just setting some properties for proof of principle
            $scope.taskModelWrapper.taskModel.taskFilter.completed = 1;
            $scope.taskModelWrapper.taskModel.taskFilter.startDate = new Date("03/01/2016");

            loadTasksDeferred.reject({
                data : "Something Bad Happened"
            });

            $scope.onFilterRequest();
            $scope.$apply();
            expect(window.alert).toHaveBeenCalledWith('Something Bad Happened')

        })

    })


    describe('Create Edit Task Modal', function(){

        var modalWindowDeferred;
        beforeEach(function(){
            modalWindowDeferred = $q.defer()
            spyOn($uibModal,'open').and.returnValue({
                result : modalWindowDeferred.promise
            })
        })


        it('onNewTask()', function(){
            var numberOfTasks = TaskModel.tasks.length;
            modalWindowDeferred.resolve({taskID: 900})
            $scope.onNewTask();
            $scope.$apply();
            // make sure that a new task was added
            expect(TaskModel.tasks.length).toBe(numberOfTasks+1)
            // make sure that the new task added has the taskID of the task we said to add above
            expect(TaskModel.tasks[TaskModel.tasks.length-1].taskID).toBe(900)
        })

        it('onEditTask()', function(){
            console.log('on edit task test')
            // mock a tasks array
            TaskModel.tasks = sharedTaskArray;

            console.log(TaskModel.tasks);
            console.log(TaskModel.tasks.length);

            var numberOfTasks = TaskModel.tasks.length;
            var task = {description : 'Updated', taskID : 2};

            modalWindowDeferred.resolve(task)
            $scope.onEditTask(task);
            $scope.$apply();

            expect(TaskModel.tasks.length).toBe(numberOfTasks)
            expect(TaskModel.tasks[1].description).toBe('Updated')
        })

    });

    describe('onToggleScheduler()', function(){

        beforeEach(function(){
            spyOn(taskService,'loadTasks').and.returnValue($q.defer().promise)
        });

        it('schedulerState == true', function(){
            $scope.scheduler.schedulerState = true;
            $scope.onToggleScheduler();
            expect($scope.scheduler.schedulerState).toBeFalsy();
            expect($scope.gridContainerStyle).toBe('horizontal-layout-94');
            expect($scope.schedulerShowButtonLabel).toBe("<");
        })

        it('schedulerState == false', function(){
            $scope.scheduler.schedulerState = false;
            $scope.onToggleScheduler();
            expect($scope.scheduler.schedulerState).toBeTruthy();
            expect($scope.gridContainerStyle).toBe('horizontal-layout-40');
            expect($scope.schedulerShowButtonLabel).toBe(">");
            expect(taskService.loadTasks).toHaveBeenCalled()
        })

    });

    describe('onSchedulerDateChange()', function(){

        var loadTasksDeferred;
        beforeEach(function(){
            loadTasksDeferred = $q.defer()
            spyOn(taskService,'loadTasks').and.returnValue(loadTasksDeferred.promise)
        });

        it('Data Loaded No Added Tasks', function(){
            $scope.scheduler.schedulerDate = new Date("03/01/2016");
            loadTasksDeferred.resolve({
                data : {
                    resultObject : sharedTaskArray,
                    error: 0
                }
            });
            $scope.onSchedulerDateChange()
            $scope.$apply();
            expect(TaskModel.scheduledTasks.length).toBe(2);
            // doing an object compare wasn't working; so drill into IDs for checking
            expect(TaskModel.scheduledTasks[0].taskID).toBe(1);
            expect(TaskModel.scheduledTasks[1].taskID).toBe(2);
        });

        it('Data Loaded with Added Tasks', function(){
            $scope.scheduler.schedulerDate = new Date("03/01/2016");
            // the added tasks wil be concantenated on the result
            TaskModel.addedTasks = sharedTaskArray;
            loadTasksDeferred.resolve({
                data : {
                    resultObject : sharedTaskArray,
                    error: 0
                }
            });
            $scope.onSchedulerDateChange()
            $scope.$apply();
            // just check the length here
            expect(TaskModel.scheduledTasks.length).toBe(4);
        });

        it('Data Load Failed', function(){
            $scope.scheduler.schedulerDate = new Date("03/01/2016");
            // the added tasks wil be concantenated on the result
            TaskModel.addedTasks = sharedTaskArray;
            loadTasksDeferred.resolve({
                data : {
                    error: 1
                }
            });
            $scope.onSchedulerDateChange()
            $scope.$apply();
            expect(window.alert).toHaveBeenCalledWith('We could not load the task data')

        });

    });

    describe('onScheduleTask()', function(){
        // add task already on array
        // [no change in size to scheduledTasks or addedTasks
        it('Try to add existing task to array', function(){
            var taskLength = sharedTaskArray.length
            TaskModel.scheduledTasks = TaskModel.addedTasks = sharedTaskArray;
            $scope.onScheduleTask(TaskModel.addedTasks[0]);
            expect(TaskModel.scheduledTasks.length).toBe(taskLength)
            expect(TaskModel.addedTasks.length).toBe(taskLength)
        });

        // add task not on array
        // change in size of scheduledTasks and addedTasks
        it('Add new task to array', function(){
            TaskModel.scheduledTasks = sharedTaskArray;
            var scheduledTasksLength = TaskModel.scheduledTasks.length
            TaskModel.addedTasks = [];
            var addedTasksLength = TaskModel.addedTasks.length
            $scope.onScheduleTask({taskID : 900});
            expect(TaskModel.scheduledTasks.length).toBe(scheduledTasksLength+1)
            expect(TaskModel.addedTasks.length).toBe(addedTasksLength+1)
        });

    });

    describe('onTaskListSchedule()', function(){

        var scheduleTaskListDeferred;
        beforeEach(function(){
            scheduleTaskListDeferred = $q.defer();
            TaskModel.tasks = sharedTaskArray;
            TaskModel.scheduledTasks = sharedTaskArray;
            TaskModel.addedTasks = sharedTaskArray;
            $scope.scheduler.schedulerDate = new Date("03/01/2016");
            spyOn(taskService, 'scheduleTaskList').and.returnValue(scheduleTaskListDeferred.promise)
        })

        it('Schedule Tasks Success', function(){
            $scope.scheduler.schedulerDate = new Date("03/01/2016");
            scheduleTaskListDeferred.resolve({
                data : {error: 0}
            });
            $scope.onTaskListSchedule();
            $scope.$apply();

            expect(TaskModel.addedTasks.length).toBe(0)
            expect(TaskModel.tasks[0].dateScheduled).toBe('3/1/2016')
        })

        it('Schedule Tasks Fail', function(){
            $scope.scheduler.schedulerDate = new Date("03/01/2016");
            scheduleTaskListDeferred.resolve({
                data : {error: 1}
            });
            $scope.onTaskListSchedule();
            $scope.$apply();
            expect(window.alert).toHaveBeenCalledWith('We could not schedule the tasks')

        })

        it('Schedule Tasks Service Failure', function(){
            $scope.scheduler.schedulerDate = new Date("03/01/2016");
            scheduleTaskListDeferred.reject({
                data : "something bad happened"
            });
            $scope.onTaskListSchedule();
            $scope.$apply();
            expect(window.alert).toHaveBeenCalledWith("something bad happened")

        })

    });

    describe('onCompletedCheckBoxChange()', function(){
        var completeTaskDeferred, task;
        beforeEach(function(){
            task = sharedTaskArray[0];
            TaskModel.tasks = sharedTaskArray;
            completeTaskDeferred = $q.defer();
            spyOn(taskService, 'completeTask').and.returnValue(completeTaskDeferred.promise)
        })

        it('Complete Tasks Success', function(){
            task.completed = 0;
            completeTaskDeferred.resolve( {
                data : {
                    resultObject : [
                        {taskID : 1, completed : 1}
                    ],
                    error: 0
                }
            });
            $scope.onCompletedCheckBoxChange(task);
            $scope.$apply();

            expect(TaskModel.tasks[0].completed).toBe(1)
        })

        it('Complete Tasks Fail', function(){
            completeTaskDeferred.resolve( {
                data : {
                    error: 1
                }
            });
            $scope.onCompletedCheckBoxChange(task);
            $scope.$apply();

            expect(window.alert).toHaveBeenCalledWith('We could not load the task data')
        });

        it('Complete Tasks Service Failure', function(){
            completeTaskDeferred.reject({
                data : "something bad happened"
            });
            $scope.onCompletedCheckBoxChange(task);
            $scope.$apply();
            expect(window.alert).toHaveBeenCalledWith("something bad happened")

        })

    });

});