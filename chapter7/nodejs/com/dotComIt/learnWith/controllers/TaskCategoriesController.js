const databaseConnection = require('../database/DatabaseConnection')
const express = require("express");
const router = express.Router();

router.get('', (req, res) => {
    const query = "select * from taskCategories order by taskCategory";

    databaseConnection.executeQuery(query).then(
        (result) => {
            console.log(result);
            res.status(200).json(result.recordset);
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

exports.taskCategoriesController = router;