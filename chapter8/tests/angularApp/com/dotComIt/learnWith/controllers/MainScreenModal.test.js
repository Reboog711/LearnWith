/**
 * Created by jhouser on 12/7/2016.
 * This duplicates tests from the MainScreenCtrl.test.js
 * Done to make it more self contained so I could write about how to test a modal popup
 */

describe('MainScreenCtrl', function() {

    var $scope, $q,$uibModal, TaskModel,controller;

    beforeEach(module('learnWith'));

    beforeEach(inject(function(_$httpBackend_){
        _$httpBackend_.whenGET('com/dotComIt/learnWith/views/login/Login.html').respond(200, true);
    }))

    beforeEach(inject(function($controller, $rootScope, _$uibModal_, _TaskModel_, _$q_ ){
        $scope = $rootScope.$new();
        TaskModel = _TaskModel_;
        $q = _$q_;
        $uibModal = _$uibModal_

        controller = $controller('MainScreenCtrl', {
            '$scope' : $scope,
            '$uibModal' : _$uibModal_,
            'TaskModel' : _TaskModel_
        });

    }));


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
            TaskModel.tasks =[
                {description : 'something', taskID : 1},
                {description : 'something Else', taskID : 2},
            ]

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

});