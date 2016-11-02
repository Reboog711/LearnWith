/**
 * Created by jhouser on 4/7/2016.
 */

angular.module('learnWith').controller('LoginCtrl',['$scope','AuthenticationService','UserModel','$location',function($scope,AuthenticationService,UserModel,$location){
    $scope.title = 'Login View';

    $scope.userModel = UserModel;
    console.log($scope.userModel);

    $scope.usernameError = '';
    $scope.passwordError = '';

    $scope.onReset = function onReset(){
        $scope.userModel.user.username = '';
        $scope.userModel.user.password = '';
    }
    $scope.onLogin= function onLogin(){
        var errorFound = false;
        if($scope.userModel.user.username == ''){
            $scope.usernameError = 'You Must Enter a Username'
            errorFound = true;
        } else {
            $scope.usernameError = '';
        }
        if($scope.userModel.user.password == ''){
            $scope.passwordError = 'You Must Enter a Password';
            errorFound = true;
        } else {
            $scope.passwordError = '';
        }
        if(errorFound == true){
            return;
        }

        AuthenticationService.authenticate($scope.userModel.user.username,$scope.userModel.user.password).then(onLoginSuccess,onLoginError);


    }

    var onLoginError = function onLoginError(response){
        console.log('failure');
        console.log(response);
        alert(response.data);
    }

    var onLoginSuccess = function onLoginSuccess(response){
        if(response.data.error == 1){
            alert("We could not log you in");
            return;
        }
        $scope.userModel.user = response.data.resultObject;
        $location.path( "/tasks" );
    }


    // helper functions for development to make logging in easy
    $scope.onLoginAsMe = function onLoginAsMe(){
        console.log('login as me');
        $scope.userModel.user.username = 'me';
        $scope.userModel.user.password = 'me';
        $scope.onLogin();
    }

    $scope.onLoginAsWife = function onLoginAsWife(){
        console.log('login as wife');
        $scope.userModel.user.username = 'wife';
        $scope.userModel.user.password = 'wife';
        $scope.onLogin();
    }


}]);

