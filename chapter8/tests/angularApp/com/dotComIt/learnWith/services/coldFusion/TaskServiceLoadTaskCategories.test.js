/**
 * Created by jhouser on 12/11/2016.
 * This duplicates tests from the TaskService.test.js
 * Done to make it more self contained so I could write about how to test a modal popup
 */

describe('TaskService', function() {

    var servicePrefix = '../coldFusion/';
    var taskServiceURL = servicePrefix + 'com/dotComIt/learnWith/services/TaskService.cfc';


    beforeEach(module('learnWith'));

    var TaskService,$httpBackend, transformFunction;
    beforeEach(inject(function(_$httpBackend_,_$http_,_TaskService_){
        $httpBackend = _$httpBackend_;
        transformFunction = _$http_.defaults.transformRequest[0]
        _$httpBackend_.whenGET('com/dotComIt/learnWith/views/login/Login.html').respond(200, true);
        TaskService = _TaskService_;
    }))


        it('Success',function(){
            // this does not work
            var parameters = {
                method : "getTaskCategories",
            }

            $httpBackend.whenPOST(taskServiceURL, transformFunction(parameters))
                .respond(200,{"resultObject":[
                    {"taskCategoryID":0,"taskCategory":"All Categories"},
                    {"taskCategoryID":1,"taskCategory":"Business"},
                    {"taskCategoryID":2,"taskCategory":"Personal"}],
                    "error":false});

            var response = TaskService.loadTaskCategories();

            response.then(function(response){
                expect(response.data.error).toBeFalsy();
                expect(response.data.resultObject.length).toBe(3);
                expect(response.data.resultObject[0].taskCategoryID).toBe(0);
                expect(response.data.resultObject[0].taskCategory).toBe("All Categories");
            });

            $httpBackend.flush()

        })


});
