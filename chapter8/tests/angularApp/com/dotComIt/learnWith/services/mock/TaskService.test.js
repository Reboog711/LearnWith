/**
 * Created by jhouser on 12/8/2016.
 */

describe('TaskService', function() {

    var TaskService, $timeout;

    // not sure if this is needed
//    var task = {"taskCategoryID":2,"taskCategory":"Personal","description":"Get Milk","dateScheduled":"March, 29 2016 00:00:00","dateCompleted":"","taskID":0,"dateCreated":"March, 27 2016 11:42:58","completed":0,"userID":1};

    beforeEach(module('learnWith'));

    beforeEach(inject(function(_$httpBackend_){
        _$httpBackend_.whenGET('com/dotComIt/learnWith/views/login/Login.html').respond(200, true);
    }))


    beforeEach(inject(function(_$timeout_,_TaskService_){
        TaskService = _TaskService_;
        $timeout = _$timeout_;
    }));

    describe('loadTaskCategories()', function() {

        it('Success',function(){
            var response = TaskService.loadTaskCategories();

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject.length).toBe(3);
                expect(response.data.resultObject[0].taskCategoryID).toBe(0);
                expect(response.data.resultObject[0].taskCategory).toBe("All Categories");
            });

            $timeout.flush()

        })

    });


    describe('loadTasks()', function() {

        it('Load Completed Tasks',function(){
            var taskFilter = {
                completed : 1
            }
            var response = TaskService.loadTasks(taskFilter);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject.length).toBe(6);
            });

            $timeout.flush()

        })
        it('Load Not Completed Tasks',function(){
            var taskFilter = {
                completed : 0
            }
            var response = TaskService.loadTasks(taskFilter);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject.length).toBe(25);
            });

            $timeout.flush()

        })
        it('Load Task Category ID 1',function(){
            var taskFilter = {
                taskCategoryID : 1
            }
            var response = TaskService.loadTasks(taskFilter);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject.length).toBe(16);
            });
            $timeout.flush()
        })
        it('Load Start Date 04/28/2016',function(){
            var taskFilter = {
                    startDate : new Date("04/28/2016")
            }
            var response = TaskService.loadTasks(taskFilter);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject.length).toBe(25);
            });
            $timeout.flush()
        })
        it('Load End Date 04/28/2016',function(){
            var taskFilter = {
                endDate : new Date("04/28/2016")
            }
            var response = TaskService.loadTasks(taskFilter);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject.length).toBe(6);
            });
            $timeout.flush()
        })
        it('Schedule Start Date 04/28/2016',function(){
            var taskFilter = {
                scheduledStartDate : new Date("04/28/2016")
            }
            var response = TaskService.loadTasks(taskFilter);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject.length).toBe(9);
            });
            $timeout.flush()
        })
        it('Schedule End Date 04/28/2016',function(){
            var taskFilter = {
                scheduledEndDate : new Date("04/28/2016")
            }
            var response = TaskService.loadTasks(taskFilter);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject.length).toBe(5);
            });
            $timeout.flush()
        })
        it('Schedule Equal Date 04/28/2016',function(){
            var taskFilter = {
                scheduledEqualDate : new Date("11/22/2016")
            }
            var response = TaskService.loadTasks(taskFilter);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject.length).toBe(4);
            });
            $timeout.flush()
        })


    });
    describe('updateTask()', function() {


        it('Create Task',function(){
            var task = {"taskCategoryID":2,"taskID":0};

            var response = TaskService.updateTask(task);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject[0].taskID).toBe(32);
                expect(response.data.resultObject[0].taskCategory).toBe('Personal');
            });

            $timeout.flush()
        })

        // kinda moot w/ the mock services; we're just sending something in and seeing if we get it back
        it('Update Task',function(){
            var task = {"taskCategoryID":1,"taskID":1};

            var response = TaskService.updateTask(task);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject[0].taskID).toBe(1);
                expect(response.data.resultObject[0].taskCategory).toBe('Business');
            });

            $timeout.flush()

        })

    });

    // the mock service just pushes out what we send in here;
    // not much to test
    describe('scheduleTask()', function() {

        it('Schedule Task',function(){
            var task = {"taskCategoryID":2,"taskID":0};

            var response = TaskService.scheduleTask(task);

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject[0]).toBe(task);
            });

            $timeout.flush()
        })

    });

    describe('scheduleTaskList()', function() {

        it('Schedule Task List',function(){

            var response = TaskService.scheduleTaskList();

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
            });

            $timeout.flush()
        })

    });

    describe('completeTask()', function() {

        it('Make task Completed',function(){

            var task = {"taskCategoryID":1,"taskID":1,"completed":0};

            var response = TaskService.completeTask(task);


            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject[0].completed).toBeTruthy();
            });

            $timeout.flush()
        })

        it('Make Task Not Completed',function(){

            var task = {"taskCategoryID":1,"taskID":1,"completed":1};

            var response = TaskService.completeTask(task);


            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject[0].completed).toBeFalsy();
            });

            $timeout.flush()
        })

    });



});
