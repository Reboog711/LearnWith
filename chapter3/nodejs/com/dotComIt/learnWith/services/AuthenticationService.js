/**
 * Created by jhouser on 6/3/2016.
 */

var databaseConnection = require("./../database/DatabaseConnection");
var responseHandler = require("./../server/JSONResponseHandler")

function login(response, queryString) {
    console.log('in login method');
    var resultObject = {};
    var callback = '';
    if(queryString.callback != undefined){
        callback = queryString.callback;
    }
    if((queryString.username == undefined) ||
        (queryString.password == undefined)){
        resultObject.error = 1;
        responseHandler.execute(response, resultObject, callback);
    } else {
        query = "select * from users ";
        query = query + "where username = '" + queryString.username + "' ";
        query = query + "and password = '" + queryString.password + "' ";

        console.log(query);
        var dataQuery = databaseConnection.executeQuery(query,
            function(recordset) {
                console.log('AuthenticationServiceExecuteResultHandler')
                console.log(recordset);
                if(recordset.length == 1){
                    resultObject.error = 0;
                    resultObject.resultObject = {};
                    resultObject.resultObject.userID = recordset[0].userID;
                    resultObject.resultObject.username = recordset[0].userName;
                    resultObject.resultObject.role = recordset[0].roleID;
                } else {
                    resultObject.error = 1;
                }
                responseHandler.execute(response, resultObject, callback);
            }, function(err){
                console.log('AuthenticationServiceExecuteFailureHandler')
                console.log(err);
                resultObject.error = 1;
                responseHandler.execute(response, resultObject, callback);

            });
    } // this ends the else statement
}

exports.login = login;