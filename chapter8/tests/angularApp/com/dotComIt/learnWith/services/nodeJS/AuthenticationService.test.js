/**
 * Created by jhouser on 12/8/2016.
 */

describe('AuthenticationService', function() {

    var AuthenticationService, $httpBackend;

    beforeEach(module('learnWith'));

    beforeEach(inject(function(_$httpBackend_){
        $httpBackend = _$httpBackend_
        _$httpBackend_.whenGET('com/dotComIt/learnWith/views/login/Login.html').respond(200, true);
    }))


    beforeEach(inject(function(_AuthenticationService_){
        AuthenticationService = _AuthenticationService_;
    }));

    describe('authenticate()', function() {

        it('Success',function(){

            var username = 'me';
            var password  = 'me';
            var parameters =  "username" + '=' + username + '&';
            parameters += "password" +'='+ hex_md5(password) + "&";
            parameters += "callback" + "=" + "JSON_CALLBACK" ;

            $httpBackend.when('JSONP','http://127.0.0.1:8080/login?' + parameters)
                            .respond(200,{'error':0,'resultObject':{'userID':1,'username':'me','role':1}});

            var response = AuthenticationService.authenticate(username,password);

            response.then(function(results){
                expect(results.data.error).toBe(0)
                expect(results.data.resultObject.userID).toBe(1)
            });

            $httpBackend.flush();

        })

        it('Fail',function(){

            var username = '';
            var password  = '';
            var parameters =  "username" + '=' + username + '&';
            var parameters =  "username" + '=' + username + '&';
            parameters += "password" +'='+ hex_md5(password) + "&";
            parameters += "callback" + "=" + "JSON_CALLBACK" ;

            $httpBackend.when('JSONP','http://127.0.0.1:8080/login?' + parameters)
                .respond(200,{'error':1});

            var response = AuthenticationService.authenticate(username,password);
            console.log(response);

            response.then(function(results){
                expect(results.data.error).toBe(1)
            });

            $httpBackend.flush();

        })

    });


});
