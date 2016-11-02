/**
 * Created by jhouser on 4/7/2016.
 */

angular.module('learnWith').controller('MainScreenCtrl', ['$scope','$location','UserModel','TaskModel','TaskService', function($scope,$location,UserModel,TaskModel,TaskService){

    $scope.title = 'Main View';
    $scope.taskModel = TaskModel;
    $scope.userModel = UserModel;

    $scope.taskGridOptions = {
        columnDefs: [
            {
                field: 'completed',
                displayName: 'Completed',
                cellTemplate:'com/dotComIt/learnWith/views/tasks/CompletedCheckBoxRenderer.html'
            },
            {field: 'description', displayName: 'Description'},
            {field: 'taskCategory', displayName: 'Category'},
            {field: 'dateCreated', displayName: 'Date Created'},
            {field: 'dateScheduled', displayName: 'Date Scheduled'}
        ],
        data: 'taskModel.tasks',
        enableFullRowSelection :  true,
        enableRowHeaderSelection : false,
        multiSelect: false
    }

    // code to store the selected task
    // which is probably not needed for the book
    $scope.taskGridOptions.onRegisterApi = function(gridApi){
        console.log('in onRegisterApi');
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
            var msg = 'row selected ' + row.isSelected;
            console.log(msg);
            if(row.isSelected){
                $scope.selectedItem = row.entity;
            } else {
                $scope.selectedItem = null;
            }
        });
    }

    function loadTasks(){
        TaskService.loadTasks($scope.taskModel.taskFilter).then(onTaskLoadSuccess, onTaskLoadError);
    }

    function onTaskLoadError(response){
        console.log(response.data);
        alert(response.data);
    }

    function onTaskLoadSuccess(response){
        if(response.data.error == 1){
            console.log('we could load the task data');
            alert("We could not load the task data");
            return;
        }
        $scope.taskModel.tasks = response.data.resultObject;
    }


    function validateUser(){
        if($scope.userModel.user.userID == 0){
            return false;
        }
        return true;
    }


    function onInit (){
        if(!validateUser()){
            $location.path( "/login" );
        } else {
            loadTasks();
        }
    }
    onInit();



}]);