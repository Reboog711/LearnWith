/**
 * Created by jhouser on 6/4/2016.
 */

var dateFormatter = require("dateformat");
var databaseConnection = require("./../database/DatabaseConnection");
var responseHandler = require("./../server/JSONResponseHandler");

function getFilteredTasks(response, queryString) {
    var resultObject = {};
    var callback = '';
    if(queryString.callback != undefined){
        callback = queryString.callback;
    }

    if((queryString.filter == undefined)){
        resultObject.error = 1;
        responseHandler.execute(response, resultObject, callback);
    } else {
        var json = JSON.parse( queryString.filter );
        var firstOne = true;

        var query = "select tasks.*, taskCategories.taskCategory from tasks left outer join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID) ";

        if(json.taskID != undefined){
            if(firstOne){
                query = query + "Where "
                firstOne = false;
            } else {
                query = query + "and "
            }
            query = query + " taskID = " + json.taskID + " ";
        }

        if((json.taskCategoryID != undefined) && (json.taskCategoryID != "0")){
            if(firstOne){
                query = query + "Where "
                firstOne = false;
            } else {
                query = query + "and "
            }
            query = query + " taskCategories.taskCategoryID = " +
                json.taskCategoryID + " ";
        }

        if(json.completed != undefined){
            if(firstOne){
                query = query + "Where "
                firstOne = false;
            } else {
                query = query + "and "
            }
            if(json.completed == true){
                query = query + " completed = 1 ";
            } else {
                query = query + " completed = 0 ";
            }
        }

        if(json.startDate != undefined){
            if(firstOne){
                query = query + "Where "
                firstOne = false;
            } else {
                query = query + "and "
            }
            query = query + " dateCreated >= '" + json.startDate + "' ";
        }
        if(json.endDate != undefined){
            if(firstOne){
                query = query + "Where "
                firstOne = false;
            } else {
                query = query + "and "
            }
            query = query + " dateCreated <= '" + json.endDate + "' ";
        }

        if(json.scheduledStartDate != undefined){
            if(firstOne){
                query = query + "Where "
                firstOne = false;
            } else {
                query = query + "and "
            }
            query = query + " dateScheduled >= '" + json.scheduledStartDate + "' ";
        }
        if(json.scheduledEndDate != undefined){
            if(firstOne){
                query = query + "Where "
                firstOne = false;
            } else {
                query = query + "and "
            }
            query = query + " dateScheduled <= '" + json.scheduledEndDate + "' ";
        }

        if(json.scheduledEqualDate != undefined){
            if(firstOne){
                query = query + "Where "
                firstOne = false;
            } else {
                query = query + "and "
            }
            query = query + " dateScheduled = '" + json.scheduledEqualDate + "' ";
        }


        query = query + " order by dateCreated ";

        console.log(query);

        var dataQuery = databaseConnection.executeQuery(query,
            function(recordset) {
                // Process Query Results here
                resultObject.error = 0;
                for (var x=0;x < recordset.length ; x++ ){
                    recordset[x].dateCreated =dateFormatter(recordset[x].dateCreated, "mm/dd/yyyy");
                    if(recordset[x].dateCompleted){
                        recordset[x].dateCompleted =dateFormatter(recordset[x].dateCompleted, "mm/dd/yyyy");
                    } else {
                        recordset[x].dateCompleted = '';
                    }
                    if(recordset[x].dateScheduled){
                        recordset[x].dateScheduled.setDate(recordset[x].dateScheduled.getDate() + 1);
                        recordset[x].dateScheduled =dateFormatter(recordset[x].dateScheduled, "mm/dd/yyyy");
                    } else {
                        recordset[x].dateScheduled = '';
                    }
                }

                resultObject.resultObject = recordset;
                responseHandler.execute(response, resultObject, callback);
            },
            function(err){
                // process error results here
                console.log(err);
                console.log('close get filtered tasks')
                resultObject.error = 1;
                responseHandler.execute(response, resultObject, callback);
            }
        )


    }

}

function getTaskCategories(response, queryString) {
    var resultObject = {};
    var callback = '';
    if(queryString.callback != undefined){
        callback = queryString.callback;
    }
    var query = "select * from taskCategories order by taskCategory";

    var dataQuery = databaseConnection.executeQuery(query,
        function(recordset) {
            // query result function here
            recordset.unshift({taskCategoryID:0,taskCategory:"All Categories"});
            resultObject.error = 0;
            resultObject.resultObject = recordset;
            responseHandler.execute(response, resultObject, callback);
        },
        function(err) {
            // query error function here
            console.log(err);
            console.log('close get task categories')
            resultObject.error = 1;
            responseHandler.execute(response, resultObject, callback);
            return;
        }
    )

}

function createTask(response, queryString) {
    var resultObject = {};
    var callback = '';
    if(queryString.callback != undefined){
        callback = queryString.callback;
    }
    if((queryString.taskCategoryID == undefined) ||
        (queryString.userID == undefined) ||
        (queryString.description == undefined)){
        resultObject.error = 1;
        responseHandler.execute(response, resultObject, callback);
    } else {
        // process query here
        query = "insert into tasks(taskCategoryID, userID, description, completed,dateCreated) values( ";
        if (queryString.taskCategoryID != 0) {
            query = query + " " + queryString.taskCategoryID + ", ";
        } else {
            query = query + " null, ";
        }
        query = query + " " + queryString.userID + ", ";
        query = query + " '" + queryString.description + "', ";
        query = query + " 0, ";
        query = query + " GETDATE() ) ";
        query = query + " SELECT SCOPE_IDENTITY() as taskID ";

        var dataQuery = databaseConnection.executeQuery(query,
            function (recordset) {
                var queryStringData = {};
                queryStringData.taskID = recordset[0].taskID;
                queryStringData = JSON.stringify(queryStringData);
                mockQueryString = {};
                mockQueryString.filter = queryStringData;
                mockQueryString.callback = callback;
                getFilteredTasks(response, mockQueryString)
            },
            function (err) {
                resultObject.error = 1;
                responseHandler.execute(response, resultObject, callback);
            }
        );
    }
}

function updateTask(response, queryString) {
    var resultObject = {};
    var callback = '';
    if(queryString.callback != undefined){
        callback = queryString.callback;
    }
    if((queryString.taskCategoryID == undefined) ||
        (queryString.taskID == undefined) ||
        (queryString.description == undefined)){
        resultObject.error = 1;
        responseHandler.execute(response, resultObject, callback);
    } else {
        // process query here
        query = "update tasks set ";
        if(queryString.taskCategoryID != 0) {
            query = query + " taskCategoryID = " + queryString.taskCategoryID + ", ";
        } else {
            query = query + " taskCategoryID = null, ";
        }
        query = query + " description='" + queryString.description + "' ";
        query = query + " where taskID = " + queryString.taskID;

        var dataQuery = databaseConnection.executeQuery(query,
            function(recordset) {
                var queryStringData = {};
                queryStringData.taskID = queryString.taskID;
                queryStringData = JSON.stringify(queryStringData);
                mockQueryString = {};
                mockQueryString.filter = queryStringData;
                mockQueryString.callback = callback;
                getFilteredTasks(response, mockQueryString)
            }, function(err){
                resultObject.error = 1;
                responseHandler.execute(response, resultObject, callback);
            }
        );

    }
}

function scheduleTask(response, queryString) {
    var resultObject = {};
    var callback = '';
    if(queryString.callback != undefined){
        callback = queryString.callback;
    }
    if((queryString.taskID == undefined) ){
        resultObject.error = 1;
        responseHandler.execute(response, resultObject, callback);
    } else {
        // Complete request here
        query = "update tasks set ";
        if(queryString.dateScheduled  != undefined) {
            query = query + " dateScheduled = '" +  queryString.dateScheduled + " ' ";
        } else {
            query = query + " dateScheduled = null ";
        }
        query = query + " where taskID = " + queryString.taskID;

        var dataQuery = databaseConnection.executeQuery(query,
            function(err, recordset){
                var queryStringData = {};
                queryStringData.taskID = queryString.taskID;
                queryStringData = JSON.stringify(queryStringData);
                mockQueryString = {};
                mockQueryString.filter = queryStringData;
                mockQueryString.callback = callback;
                getFilteredTasks(response, mockQueryString)
            }, function(err){
                resultObject.error = 1;
                responseHandler.execute(response, resultObject, callback);

            }
        );

    }

}

function scheduleTaskList(response, queryString) {
    var resultObject = {};
    var callback = '';
    if(queryString.callback != undefined){
        callback = queryString.callback;
    }
    if((queryString.taskIDList == undefined) ||
        (queryString.dateScheduled == undefined)){
        resultObject.error = 1;
        responseHandler.execute(response, resultObject, callback);
    } else {
        // Execute Query Here
        query = "update tasks set ";
        query = query + "dateScheduled = '" + queryString.dateScheduled + " ' ";
        query = query + "where taskID in (" + queryString.taskIDList + ")";

        var dataQuery = databaseConnection.executeQuery(query,
            function(recordset) {
                resultObject.error = 0;
                responseHandler.execute(response, resultObject, callback);
            },
            function(err){
                resultObject.error = 1;
                responseHandler.execute(response, resultObject, callback);
                return;
            }
        );

    }

}

function completeTask(response, queryString) {
    var resultObject = {};
    var callback = '';
    if(queryString.callback != undefined){
        callback = queryString.callback;
    }
    if((queryString.taskID == undefined) ||
        (queryString.completed == undefined)){
        resultObject.error = 1;
        responseHandler.execute(response, resultObject, callback);
    } else {
        // Query processing code here
        query = "update tasks set ";
        if(queryString.completed == 'true'){
            query = query + " completed = 1, ";
            query = query + " dateCompleted = GETDATE() ";
        } else {
            query = query + " completed = 0, ";
            query = query + " dateCompleted = null ";
        }
        query = query + " where taskID = " + queryString.taskID + " ";

        var dataQuery = databaseConnection.executeQuery(query,
            function(err) {
                var queryStringData = {};
                queryStringData.taskID = queryString.taskID;
                queryStringData = JSON.stringify(queryStringData);
                mockQueryString = {};
                mockQueryString.filter = queryStringData;
                mockQueryString.callback = callback;
                getFilteredTasks(response, mockQueryString)
            },
            function(err) {
                resultObject.error = 1;
                responseHandler.execute(response, resultObject, callback);
            }
        );
    }

}


exports.getFilteredTasks = getFilteredTasks;
exports.getTaskCategories = getTaskCategories;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.scheduleTask = scheduleTask;
exports.scheduleTaskList = scheduleTaskList;
exports.completeTask = completeTask;
