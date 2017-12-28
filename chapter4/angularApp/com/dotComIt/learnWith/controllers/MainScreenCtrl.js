/**
 * Created by jhouser on 4/7/2016.
 */

angular.module('learnWith').controller('MainScreenCtrl', ['$scope','$location','$filter','UserModel','TaskModel','TaskService', function($scope,$location,$filter,UserModel,TaskModel,TaskService){

    $scope.title = 'Main View';
    $scope.taskModelWrapper = {
        taskModel : TaskModel
    }
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
        data: 'taskModelWrapper.taskModel.tasks',
        enableFullRowSelection :  true,
        enableRowHeaderSelection : false,
        multiSelect: false
    }

    $scope.dateOptions = {
        startingDay: 0,
        showWeeks: false
    };
    $scope.createdAfterDateProperties = {
        opened : false
    };
    $scope.createdBeforeDateProperties = {
        opened : false
    };
    $scope.scheduledAfterDateProperties = {
        opened : false
    };
    $scope.scheduledBeforeDateProperties = {
        opened : false
    };
    $scope.openDatePicker = function(data) {
        data.opened = !data.opened;
    };


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

    function loadTasks(taskFilter){
        TaskService.loadTasks(taskFilter).then(onTaskLoadSuccess, onTaskLoadError);
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
        $scope.taskModelWrapper.taskModel.tasks = response.data.resultObject;
    }

    function loadTaskCategories(){
        TaskService.loadTaskCategories().then(onTaskCategoriesLoadSuccess,onTaskLoadError)
    }

    function onTaskCategoriesLoadSuccess(response){
        if(response.data.error == 1){
            console.log('we could load the task categories');
            alert("We could not load the task categories");
            return;
        }
        $scope.taskModelWrapper.taskModel.taskCategories = response.data.resultObject;
        $scope.taskModelWrapper.taskModel.taskCategoriesForFilter = Object.assign( [], response.data.resultObject );
        var allTask = {
            taskCategoryID : 0,
            taskCategory : "All Categories"
        }
        $scope.taskModelWrapper.taskModel.taskCategoriesForFilter.unshift(allTask);
    }

    $scope.onFilterRequest = function onFilterRequest(){
        var localTaskFilter = {};
        if($scope.taskModelWrapper.taskModel.taskFilter.completed != -1){
            localTaskFilter.completed = $scope.taskModelWrapper.taskModel.taskFilter.completed;
        }
        localTaskFilter.taskCategoryID=$scope.taskModelWrapper.taskModel.taskFilter.taskCategoryID;

        if($scope.taskModelWrapper.taskModel.taskFilter.startDate){
            localTaskFilter.startDate = $filter('date')($scope.taskModelWrapper.taskModel.taskFilter.startDate,'shortDate');
        }
        if($scope.taskModelWrapper.taskModel.taskFilter.endDate){
            localTaskFilter.endDate = $filter('date')($scope.taskModelWrapper.taskModel.taskFilter.endDate, 'shortDate');
        }
        if($scope.taskModelWrapper.taskModel.taskFilter.scheduledStartDate){
            localTaskFilter.scheduledStartDate = $filter('date')($scope.taskModelWrapper.taskModel.taskFilter.scheduledStartDate, 'shortDate');
        }
        if($scope.taskModelWrapper.taskModel.taskFilter.scheduledEndDate){
            localTaskFilter.scheduledEndDate = $filter('date')($scope.taskModelWrapper.taskModel.taskFilter.scheduledEndDate, 'shortDate');
        }

        loadTasks(localTaskFilter);
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
            loadTasks($scope.taskModelWrapper.taskModel.taskFilter);
            loadTaskCategories();
        }
    }
    onInit();



}]);