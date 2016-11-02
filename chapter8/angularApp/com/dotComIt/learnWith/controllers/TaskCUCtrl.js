/**
 * Created by jhouser on 4/9/2016.
 */

angular.module('learnWith').controller('TaskCUCtrl', ['$scope','$uibModalInstance','TaskModel','UserModel','TaskService','title', 'taskVO',
    function($scope,$uibModalInstance,TaskModel,UserModel,TaskService, title, taskVO){

        $scope.title = title;
        $scope.taskModel = TaskModel;
        $scope.taskVO = taskVO;

        $scope.onSave = function onSave () {
            console.log('on save');
            TaskService.updateTask($scope.taskVO, UserModel.user).then(onTaskUpdateSuccess,onTaskUpdateError);
        }
        function onTaskUpdateError(response){
            alert(response.data);
        }
        function onTaskUpdateSuccess(response){
            if(response.data.error == 1){
                alert("We could not create the task data");
                return;
            }
            $uibModalInstance.close(response.data.resultObject[0]);
        }

        $scope.onClose = function onClose() {
            $uibModalInstance.dismiss();
        };

    }
]);
