const databaseConnection = require('../database/DatabaseConnection')
const express = require("express");
const router = express.Router();

router.post('/login', (req, res) => {
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);

    query = "select * from users ";
    query = query + "where username = '" + req.body.username + "' ";
    query = query + "and password = '" + req.body.password + "' ";

    console.log(query);
    databaseConnection.executeQuery(query).then(
        (result) => {
            console.log('UserControllerLoginExecuteResultHandler')
            console.log(result);
            if(result.recordset.length == 1){
                const user = {};
                user.userID = result.recordset[0].userID;
                user.username = result.recordset[0].userName;
                user.roleID = result.recordset[0].roleID;
                res.status(200).json(user);
            } else {
                const error = {};
                error.message = 'User Not Authorized';
                res.status(401).json(error);
            }
        },
    ).catch(
        (err) => {
            console.log('AuthenticationServiceExecuteFailureHandler')
            console.log(err);
                const error = {};
                error.message = 'Database Connection Error';
                res.status(503).json(error);
        }
    )
});

exports.userController = router;