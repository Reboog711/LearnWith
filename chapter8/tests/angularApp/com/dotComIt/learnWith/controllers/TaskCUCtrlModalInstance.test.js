/**
 * Created by jhouser on 12/8/2016.
 * This duplicates tests from the TaskCUCtrl.test.js
 * Done to make it more self contained so I could write about how to test a modal popup
 */

describe('TaskCUCtrl', function() {

    var controller, $q, $scope, $uibModalInstance, TaskService;

    beforeEach(module('learnWith'));

    beforeEach(inject(function(_$httpBackend_){
        _$httpBackend_.whenGET('com/dotComIt/learnWith/views/login/Login.html').respond(200, true);
    }))

    beforeEach(inject(function($controller, $rootScope,  _UserModel_, _TaskService_, _$q_ ){
        $scope = $rootScope.$new();
        TaskService = _TaskService_;
        $q = _$q_;
        _UserModel_.user = {"role":1,"username":"me","userID":1}

        // no mocked version of $uibModalInstance so creating a fake object
        // borrowed from http://stackoverflow.com/questions/24373220/testing-angularui-bootstrap-modal-instance-controller/24376344#24376344
        $uibModalInstance = {
            close : function(){},
            dismiss : function(){}
        };

        controller = $controller('TaskCUCtrl', {
            '$scope' : $scope,
            '$uibModalInstance' : $uibModalInstance,
            'UserModel' : _UserModel_,
            'TaskService' : _TaskService_,
            'title' : "Test Title",
            'taskVO' : {
                "taskCategoryID":2,
                "description":"Get Milk",
            }
        });

    }));

    describe('run onSave()', function(){

        var updateTaskDeferred;
        beforeEach(function(){
            updateTaskDeferred = $q.defer();
            spyOn(TaskService,'updateTask').and.returnValue(updateTaskDeferred.promise)
            spyOn($uibModalInstance,'close');
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

    });
});

