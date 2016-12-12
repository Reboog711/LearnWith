/**
 * Created by jhouser on 12/8/2016.
 */

describe('TaskCUCtrl', function() {

    var controller, $q, $scope, $uibModalInstance, TaskModel, UserModel,TaskService, TaskVO;

    beforeEach(module('learnWith'));

    beforeEach(inject(function(_$httpBackend_){
        _$httpBackend_.whenGET('com/dotComIt/learnWith/views/login/Login.html').respond(200, true);
    }))


    beforeEach(inject(function($controller, $rootScope,  _TaskModel_, _UserModel_, _TaskService_, _$q_ ){
        $scope = $rootScope.$new();
        // no mocked version of $uibModalInstance so creating a fake object
        // borrowed from http://stackoverflow.com/questions/24373220/testing-angularui-bootstrap-modal-instance-controller/24376344#24376344
        $uibModalInstance = {
            close : function(){},
            dismiss : function(){}
        };
        TaskModel = _TaskModel_;
        UserModel =  _UserModel_;
        TaskService = _TaskService_;
        $q = _$q_;
        TaskVO = {
            "taskCategoryID":2,
            "taskCategory":"Personal",
            "description":"Get Milk",
            "dateScheduled":"March, 29 2016 00:00:00",
            "dateCompleted":"",
            "taskID":1,
            "dateCreated":"March, 27 2016 11:42:58",
            "completed":0,
            "userID":1
        }

        UserModel.user = {"role":1,"username":"me","userID":1}

        controller = $controller('TaskCUCtrl', {
            '$scope' : $scope,
            '$uibModalInstance' : $uibModalInstance,
            'TaskModel' : _TaskModel_,
            'UserModel' : _UserModel_,
            'TaskService' : _TaskService_,
            'title' : "Test Title",
            'taskVO' : TaskVO
        });

    }));

    describe('run onSave()', function(){


        var updateTaskDeferred;
        beforeEach(function(){
            updateTaskDeferred = $q.defer();
            spyOn(TaskService,'updateTask').and.returnValue(updateTaskDeferred.promise)
            spyOn($uibModalInstance,'close');
            spyOn(window, 'alert');

        });

        it('Success Response', function(){

            var newTask = {}

            updateTaskDeferred.resolve({
                data : {error : 0,resultObject : [newTask]}
            })
            $scope.onSave();
            $scope.$apply();

            expect($uibModalInstance.close).toHaveBeenCalledWith(newTask);
        })

        it('Failed Response', function(){

            updateTaskDeferred.resolve({
                data : {error : 1}
            })
            $scope.onSave();
            $scope.$apply();

            expect(window.alert).toHaveBeenCalledWith('We could not create the task data')
        })

        it('Failed Service Call', function(){

            updateTaskDeferred.reject({
                data : "something bad happened"
            })
            $scope.onSave();
            $scope.$apply();

            expect(window.alert).toHaveBeenCalledWith('something bad happened')
        })

    });

    describe('run onClose()', function(){
        beforeEach(function(){
            spyOn($uibModalInstance,'dismiss');

        });
        it('Dismiss Popup', function(){
            $scope.onClose();
            expect($uibModalInstance.dismiss).toHaveBeenCalled();
        });

    });


});
