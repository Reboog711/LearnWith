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

    if((req.query.taskCategoryID != undefined) && (req.query.taskCategoryID != "0")){
        query = query + "and taskCategories.taskCategoryID = " +
            req.query.taskCategoryID + " ";
    }

    if(req.query.startDateAsUTCString != undefined){
        query = query + "and dateCreated >= '" + req.query.startDateAsUTCString + "' ";
    }
    if(req.query.endDateAsUTCString != undefined){
        query = query + "and dateCreated <= '" + req.query.endDateAsUTCString + "' ";
    }

    if(req.query.scheduledStartDateAsUTCString != undefined){
        query = query + "and dateScheduled >= '" + req.query.scheduledStartDateAsUTCString + "' ";
    }
    if(req.query.scheduledEndDateAsUTCString != undefined){
        query = query + "and dateScheduled <= '" + req.query.scheduledEndDateAsUTCString + "' ";
    }
    if(req.query.scheduledEqualDateAsUTCString != undefined){
        const scheduleEqualEndDate = new Date(req.query.scheduledEqualDateAsUTCString);
        scheduleEqualEndDate.setDate(scheduleEqualEndDate.getDate()+1);
        query = query + "and dateScheduled >= '" + req.query.scheduledEqualDateAsUTCString + "' ";
        query = query + "and dateScheduled < '" + scheduleEqualEndDate.toISOString() + "' ";
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

router.put('/datescheduled', (req, res) => {
    console.log(req.body);

    let query = "update tasks set ";
    if (req.body.dateScheduledAsUTCString) {
        query = query + `dateScheduled = '${req.body.dateScheduledAsUTCString}'`;
    } else {
        query = query + `dateScheduled = null `;
    }
    query = query + `where taskID in (${req.body.taskIDList})`;

    console.log(query);

    databaseConnection.executeQuery(query).then(
        (result) => {
            const response = {}
            response.message = 'Updated!';
            res.status(200).json(response);
        },
    ).catch(
        (err) => {
            console.log('TasksScheduleFailureHandler')
            console.log(err);
            const error = {};
            error.message = 'Database Connection Error';
            res.status(503).json(error);
        }
    )

});


exports.tasksController = router;