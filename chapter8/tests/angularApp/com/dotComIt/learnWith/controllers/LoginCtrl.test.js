/**
 * Created by jhouser on 12/2/2016.
 */

describe('LoginCtrl', function(){

    var $scope, $location, controller, authenticationService;

    beforeEach(module('learnWith'));

    beforeEach(inject(function($controller, $rootScope, _AuthenticationService_, _UserModel_, _$location_ ){
        $scope = $rootScope.$new();
        $location = _$location_;
        authenticationService = _AuthenticationService_;

        controller = $controller('LoginCtrl', {
            '$scope' : $scope,
            '$location' : _$location_,
            'AuthenticationService' : _AuthenticationService_,
            'UserModel' : _UserModel_
        });

    }));

    describe('onReset()', function() {
        it('Scope Values turned to empty strings', function () {
            $scope.userModel.user.username = 'username';
            $scope.userModel.user.password = 'password';
            $scope.onReset();
            expect($scope.userModel.user.username).toBe('');
            expect($scope.userModel.user.password).toBe('');
        });
    });

    describe('onLogin()', function() {

        var authenticationServiceDeferred;

        beforeEach(inject(function(_$q_, _$httpBackend_ ){
            _$httpBackend_.whenGET('com/dotComIt/learnWith/views/tasks/MainScreen.html').respond(200, true);
            _$httpBackend_.whenGET('com/dotComIt/learnWith/views/login/Login.html').respond(200, true);

            spyOn($location, 'path').and.callThrough();
            authenticationServiceDeferred = _$q_.defer();
            spyOn(authenticationService, 'authenticate').and.returnValue(authenticationServiceDeferred.promise);
            spyOn(window, 'alert');
        }));



        it('No Username', function () {
            $scope.userModel.user.username = '';
            $scope.userModel.user.password = '';
            $scope.onLogin();
            expect($scope.usernameError).toBe('You Must Enter a Username');
        });
        it('No Password', function () {
            $scope.userModel.user.username = '';
            $scope.userModel.user.password = '';
            $scope.onLogin();
            expect($scope.passwordError).toBe('You Must Enter a Password');
        });

        it('Success', function () {

            $scope.userModel.user.username = 'me';
            $scope.userModel.user.password = 'me';

            var userResult = {"role":1,"username":"me","userID":1};
            authenticationServiceDeferred.resolve({
                data : {"resultObject":userResult,"error":0}
            });
            $scope.onLogin();
            $scope.$apply();
            expect($scope.userModel.user).toBe(userResult);
            expect($location.path).toHaveBeenCalledWith('/tasks')
        });

        it('Failure', function () {
            $scope.userModel.user.username = 'blah';
            $scope.userModel.user.password = 'blah';

            authenticationServiceDeferred.resolve({
                data : {"error":1}
            });
            $scope.onLogin();
            $scope.$apply();
            expect($scope.userModel.user.userID).toBe(0);
            expect($scope.userModel.user.roleID).toBe(0);
            expect(window.alert).toHaveBeenCalledWith('We could not log you in')
        });

        it('Service Failure', function () {
            $scope.userModel.user.username = 'me';
            $scope.userModel.user.password = 'me';

            authenticationServiceDeferred.reject({
                data : "Something Bad Happened"
            });
            $scope.onLogin();
            $scope.$apply();
            expect(window.alert).toHaveBeenCalledWith('Something Bad Happened')
        });

    });


/*    describe('The Simplest Tests Written for the Add-on book', function() {
        it('True is True', function () {
            expect(true).toBe(true);
        });

        it('False is False', function () {
            expect(false).toBe(false);
        });
    });*/

});