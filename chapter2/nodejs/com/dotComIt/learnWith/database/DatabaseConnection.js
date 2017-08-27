/**
 * Created by jhouser on 6/3/2016.
 */

var sql = require("mssql");

var config = {
    user: 'LearnWithUser',
    password: 'password',
    server: 'developer.dot-com-it.com',
    database: 'LearnWithApp',
    port:2433
};

var executeQuery  = function(query, resultHandler, failureHandler){
    console.log('in execute query');

    var connection = new sql.ConnectionPool(config);
    connection.connect(function(){
        console.log('connected')
        new sql.Request(connection).query(query).then(resultHandler).catch(failureHandler);
    });
    console.log('after connection initiated')

};

exports.executeQuery = executeQuery;