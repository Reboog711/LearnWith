const sql = require("mssql");

const config = {
    user: 'LearnWithUser',
    password: 'password',
    server: 'localhost',
    database: 'LearnWithApp',
    port : 1433,
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};


const executeQuery  = (query) => {
    console.log('in execute query');
    return sql.connect(config).then(pool => {
        console.log('in connect promise');
        return pool.request().query(query)
    })
};

exports.executeQuery = executeQuery;