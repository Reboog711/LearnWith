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
                resultObject.error = 1;
                responseHandler.execute(response, resultObject, callback);
            }
        )


    }

}

exports.getFilteredTasks = getFilteredTasks;
