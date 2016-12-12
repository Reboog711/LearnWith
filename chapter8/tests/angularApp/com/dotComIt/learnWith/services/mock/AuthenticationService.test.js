/**
 * Created by jhouser on 12/8/2016.
 */

describe('AuthenticationService', function() {

    var AuthenticationService, $timeout;

    beforeEach(module('learnWith'));

    beforeEach(inject(function(_$httpBackend_){
        _$httpBackend_.whenGET('com/dotComIt/learnWith/views/login/Login.html').respond(200, true);
    }))


    beforeEach(inject(function(_$timeout_,_AuthenticationService_){
        AuthenticationService = _AuthenticationService_;
        $timeout = _$timeout_;
    }));

    describe('authenticate()', function() {

        it('Success',function(){
            var response = AuthenticationService.authenticate('me','me');

            response.then(function(response){
                expect(response.data.error).toBe(0)
                expect(response.data.resultObject.userID).toBe(1)
            });

            $timeout.flush()

        })

        it('Fail',function(){
            var response = AuthenticationService.authenticate('','');

            response.then(function(response){
                expect(response.data.error).toBe(1)
            });

            $timeout.flush()

        })

    });


});
