/**
 * Created by jhouser on 12/8/2016.
 */

describe('UserModel', function() {

    var userModel;

    beforeEach(module('learnWith'));

    beforeEach(inject(function(_UserModel_){
        userModel = _UserModel_
    }));


    describe('isUserInRole()', function() {

        it('User is in Role',function(){
            userModel.user.role =  1;
            expect(userModel.isUserInRole(1)).toBeTruthy();
        })

        it('User is not in Role',function(){
            userModel.user.role =  1;
            expect(userModel.isUserInRole(2)).toBeFalsy();
        })
    });

    describe('validateUser()', function() {

        it('Valid User',function(){
            userModel.user.userID =  1;
            expect(userModel.validateUser()).toBeTruthy();
        })

        it('Invalid User',function(){
            userModel.user.userID =  0;
            expect(userModel.validateUser()).toBeFalsy();
        })
    });


});
