/**
 * Created by jhouser on 4/7/2016.
 */

angular.module('learnWith').controller('MainScreenCtrl', ['$scope','$location','$filter','$timeout','$uibModal','UserModel','TaskModel','TaskService', function($scope,$location,$filter,$timeout,$uibModal,UserModel,TaskModel,TaskService){

    $scope.title = 'Main View';
    $scope.taskModelWrapper = {
        taskModel : TaskModel
    }
    $scope.userModel = UserModel;
    $scope.gridContainerStyle = 'horizontal-layout-94';
    $scope.schedulerShowButtonLabel = "<"
    $scope.scheduler = {
        schedulerState : false,
        schedulerDate : new Date()
    }


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
            {field: 'dateScheduled', displayName: 'Date Scheduled'},
            {
                name : 'Controls',
                displayName : '',
                enableSorting : false,
                cellTemplate:'com/dotComIt/learnWith/views/tasks/EditButtonRenderer.html'
            },
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
    $scope.currentDateProperties = {
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

        $scope.gridApi = gridApi;

        // I left this out of the book; just a quick resize on load
        // because of a weird sizing issue
        $timeout(function() {
            $scope.gridApi.core.handleWindowResize();
        },100);
    }

    function loadTasks(taskFilter, onSuccess, onError){
        TaskService.loadTasks(taskFilter).then(onSuccess, onError);
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

        loadTasks(localTaskFilter, onTaskLoadSuccess, onTaskLoadError);

    }

    function openTaskWindow(title,task){
        var modalInstance = $uibModal.open({
            templateUrl:'com/dotComIt/learnWith/views/tasks/TaskCU.html',
            controller: 'TaskCUCtrl',
            resolve: {
                title : function(){ return title },
                taskVO : function(){ return task }
            }
        });
        var resultFunction = updateTaskComplete;
        if(task.taskID == 0){
            resultFunction = createTaskComplete;
        }
        modalInstance.result.then(resultFunction, onPopUpDismissal);
    }
    function onPopUpDismissal(){
        console.log('Modal dismissed at: ' + new Date());
    }
    function createTaskComplete (updatedTask) {
        TaskModel.tasks.push(updatedTask);
    }
    updateTaskComplete = function updateTaskComplete (updatedTask) {
        for (index = 0; index < TaskModel.tasks.length; ++index){
            if(TaskModel.tasks[index].taskID == updatedTask.taskID){
                TaskModel.tasks[index] = updatedTask;
                break;
            }
        }
    }


    $scope.onNewTask = function onNewTask(){
        var newTask = {
            taskCategoryID : 0,
            taskID : 0
        };
        openTaskWindow('Create a New Task',newTask);
    }
    $scope.onEditTask = function onEditTask(task){
        openTaskWindow('Edit Task',task);
    }



    function validateUser(){
        if($scope.userModel.user.userID == 0){
            return false;
        }
        return true;
    }

    $scope.onToggleScheduler = function onToggleScheduler(){
        if($scope.scheduler.schedulerState == true){
            $scope.scheduler.schedulerState = false;
            $scope.gridContainerStyle = 'horizontal-layout-94';
            $scope.schedulerShowButtonLabel = "<"
        } else {
            $scope.scheduler.schedulerState = true;
            $scope.gridContainerStyle = 'horizontal-layout-40';
            $scope.schedulerShowButtonLabel = ">"
            loadSchedulerTasks();
        }

        $timeout(function() {
            $scope.gridApi.core.handleWindowResize();
        },1);
    }

    $scope.onSchedulerDateChange = function onSchedulerDateChange(){
        loadSchedulerTasks();
    }

    function loadSchedulerTasks(){
        console.log('load scheduler tasks placeholder')
        var localTaskFilter = {};
        localTaskFilter.scheduledEqualDate = $filter('date')($scope.scheduler.schedulerDate, 'shortDate');
        loadTasks(localTaskFilter, onSchedulerTaskLoadSuccess,onTaskLoadError);
    }
    function onSchedulerTaskLoadSuccess(response){
        if(response.data.error == 1){
            alert("We could not load the task data");
            return;
        }
        TaskModel.scheduledTasks = response.data.resultObject;
        TaskModel.scheduledTasks = TaskModel.scheduledTasks.concat(TaskModel.addedTasks);
    }


    $scope.onTaskUnschedule = function onTaskUnschedule(task){
        if(task.dateScheduled){
            task.dateScheduled = null;
            scheduleTask(task);
        } else {
            deleteTaskFromSchedule(task);
        }
    }

    function deleteTaskFromSchedule(task){
        var itemIndex = TaskModel.scheduledTasks.indexOf(task);
        if(itemIndex >= 0){
            TaskModel.scheduledTasks.splice(itemIndex,1);
        }
        itemIndex = TaskModel.addedTasks.indexOf(task);
        if(itemIndex >= 0){
            TaskModel.addedTasks.splice(itemIndex,1);
        }
    }

    function scheduleTask(task){
        TaskService.scheduleTask(task).then(onTaskScheduleSuccess,onTaskScheduleError);
    }
    function onTaskScheduleError(response){
        alert(response.data);
    }
    function onTaskScheduleSuccess(response){
        if(response.data.error == 1){
            alert("We could not schedule the task data");
            return;
        }
        replaceTask(TaskModel.tasks,response.data.resultObject[0]);
        for (index = 0; index < TaskModel.scheduledTasks.length; ++index){
            if(TaskModel.scheduledTasks[index].taskID == response.data.resultObject[0].taskID){
                deleteTaskFromSchedule(TaskModel.scheduledTasks[index]);
            }
        }
    }

    function replaceTask(taskArray,task){
        for (index = 0; index < taskArray.length; ++index) {
            if(taskArray[index].taskID == task.taskID){
                taskArray[index] = task;
                break;
            }
        }
    }


    $scope.onScheduleTask = function onScheduleTask(task){
        var found= false;
        for (var index = 0; index < TaskModel.scheduledTasks.length; index++){
            if(TaskModel.scheduledTasks[index].taskID == task.taskID){
                found= true;
                break;
            }
        }
        if(!found){
            TaskModel.scheduledTasks.push(task);
            TaskModel.addedTasks.push(task);
        }
    }

    $scope.onTaskListSchedule = function onTaskListSchedule(){
        TaskService.scheduleTaskList(TaskModel.scheduledTasks, $scope.scheduler.schedulerDate).then(onTaskListScheduleSuccess,onTaskListScheduleError);
    }
    function onTaskListScheduleError(response){
        alert(response.data);
    }
    function onTaskListScheduleSuccess(response){
        if(response.data.error == 1){
            alert("We could not schedule the tasks");
            return;
        }
        for (var masterTaskIndex = 0;masterTaskIndex < TaskModel.tasks.length; ++masterTaskIndex) {
            for (scheduledTaskIndex = 0; scheduledTaskIndex < TaskModel.scheduledTasks.length; scheduledTaskIndex++) {
                if(TaskModel.tasks[masterTaskIndex].taskID == TaskModel.scheduledTasks[scheduledTaskIndex].taskID){
                    TaskModel.tasks[masterTaskIndex].dateScheduled = $filter('date')($scope.scheduler.schedulerDate, 'M/d/yyyy');
                }
            }
        }
        TaskModel.addedTasks = [];
    }



    function onInit (){
        if(!validateUser()){
            $location.path( "/login" );
        } else {
            loadTasks($scope.taskModelWrapper.taskModel.taskFilter, onTaskLoadSuccess, onTaskLoadError);
            loadTaskCategories();
        }
    }
    onInit();

}]);