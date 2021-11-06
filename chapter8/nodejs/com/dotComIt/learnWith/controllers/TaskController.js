const databaseConnection = require('../database/DatabaseConnection')
const express = require("express");
const router = express.Router();

router.get('/:taskID', (req, res) => {
    getTask(res, req.params.taskID);
});

getTask = (res, taskID) => {
    const query = `select * from tasks join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID) where taskID = ${taskID}`

    databaseConnection.executeQuery(query).then(
        (result) => {
            console.log(result);
            if (result.recordset.length === 1) {
                const task = {};
                task.taskID = result.recordset[0].taskID;
                task.taskCategoryID = result.recordset[0].taskCategoryID[0];
                task.taskCategory = result.recordset[0].taskCategory;
                task.userID = result.recordset[0].userID;
                task.description = result.recordset[0].description;
                task.completed = result.recordset[0].completed;
                task.dateCreatedAsUTCString = new Date(result.recordset[0].dateCreated).toISOString();
                if(result.recordset[0].dateCompleted){
                    task.dateCompletedAsUTCString = new Date(result.recordset[0].dateCompleted).toISOString();
                }
                if(result.recordset[0].dateScheduled){
                    task.dateScheduledAsUTCString =new Date(result.recordset[0].dateScheduled).toISOString();
                }

                res.status(200).json(task)
            } else {
                const error = {};
                error.message = "Task Not Found"
                res.status(404).json(error)
            }

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
}

router.post('', (req, res) => {
    let query = "insert into tasks(taskCategoryID, userID, description, completed,dateCreated) values( ";
    if (req.body.taskCategoryID != 0) {
        query = query + ` ${req.body.taskCategoryID} ,`;
    } else {
        query = query + ` null, `;
    }
    query = query + ` ${req.body.userID} , `;
    query = query + ` '${req.body.description}',`;
    query = query + ` 0, `;
    query = query + ` '${new Date().toISOString()}' ) `;
    query = query + ` SELECT SCOPE_IDENTITY() as taskID `;
    console.log(query)

    databaseConnection.executeQuery(query).then(
        (result) => {
            console.log('task post result handler')
            console.log(result);
            getTask(res, result.recordset[0].taskID);
        },
    ).catch(
        (err) => {
            console.log('TaskCreateFailureHandler')
            console.log(err);
            const error = {};
            error.message = 'Database Connection Error';
            res.status(503).json(error);
        }
    )
});


router.put('/:taskID', (req, res) => {
    let query = "update tasks set ";
    if(req.body.taskCategoryID != 0) {
        query = query + ` taskCategoryID = ${req.body.taskCategoryID}, `;
    } else {
        query = query + " taskCategoryID = null, ";
    }
    query = query + ` description='${req.body.description}'`;
    query = query + ` where taskID = ${req.params.taskID}`;

    console.log(query)

    databaseConnection.executeQuery(query).then(
        (result) => {
            console.log('task post result handler')
            console.log(result);
            getTask(res, req.params.taskID);
        },
    ).catch(
        (err) => {
            console.log('TaskUpdateFailureHandler')
            console.log(err);
            const error = {};
            error.message = 'Database Connection Error';
            res.status(503).json(error);
        }
    )
});

router.put('/:taskID/completed/:completed', (req, res) => {
    let query = "update tasks set ";
    if(req.params.completed == 'true'){
        const dateAsUTCString = new Date().toISOString();
        query = query + " completed = 1, ";
        query = query + ` dateCompleted = '${dateAsUTCString}' `;
    } else {
        query = query + " completed = 0, ";
        query = query + " dateCompleted = null ";
    }
    query = query + ` where taskID = ${req.params.taskID}`;

    console.log(query)

    databaseConnection.executeQuery(query).then(
        (result) => {
            console.log('task completed put result handler')
            console.log(result);
            getTask(res, req.params.taskID);
        },
    ).catch(
        (err) => {
            console.log('TaskUpdateFailureHandler')
            console.log(err);
            const error = {};
            error.message = 'Database Connection Error';
            res.status(503).json(error);
        }
    )
});



exports.taskController = router;