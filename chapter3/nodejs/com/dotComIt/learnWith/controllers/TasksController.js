const databaseConnection = require('../database/DatabaseConnection')
const express = require("express");
const router = express.Router();

router.get('', (req, res) => {
    console.log('in GET tasks');
    console.log(req.query);

    let query = "select tasks.*, taskCategories.taskCategory from tasks left outer join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID) where 0=0 ";

    if(req.query.completed != undefined){
        if(req.query.completed == 'true'){
            query = query + "and completed = 1 ";
        } else {
            query = query + "and completed = 0 ";
        }
    }

    if(req.query.startDateAsUTCString != undefined){
        query = query + "and dateCreated >= '" + req.query.startDateAsUTCString + "' ";
    }

    query = query + " order by dateCreated ";

    console.log(query);

    databaseConnection.executeQuery(query).then(
        (result) => {
            console.log(result);
            const tasks = [];
            // todo would this be better as a recordset.forEach()?
            for (var x=0;x < result.recordset.length ; x++ ){
                const task = {};
                task.taskID = result.recordset[x].taskID;
                task.taskCategoryID = result.recordset[x].taskCategoryID;
                task.taskCategory = result.recordset[x].taskCategory;
                task.userID = result.recordset[x].userID;
                task.description = result.recordset[x].description;
                task.completed = result.recordset[x].completed;
                task.dateCreatedAsUTCString = new Date(result.recordset[x].dateCreated).toISOString();
                if(result.recordset[x].dateCompleted){
                    task.dateCompletedAsUTCString = new Date(result.recordset[x].dateCompleted).toISOString();
                }
                if(result.recordset[x].dateScheduled){
                    task.dateScheduledAsUTCString =new Date(result.recordset[x].dateScheduled).toISOString();
                }
                tasks.push(task);
            }

            res.status(200).json(tasks);
        },
    ).catch(
        (err) => {
            console.log('TasksFailureHandler')
            console.log(err);
            const error = {};
            error.message = 'Database Connection Error';
            res.status(503).json(error);
        }
    )

});

exports.tasksController = router;