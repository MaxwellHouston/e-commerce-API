const Pool = require('pg').Pool;
const {dbLogin, database_url, node_env} = require('../config');


const localConfig = {
    user: dbLogin.user,
    host: dbLogin.host,
    database: dbLogin.database,
    password: dbLogin.password,
    port: dbLogin.port
}

const herokuConfig = {
    connectionString: database_url,
    ssl: {
        rejectUnauthorized: false
    }
}


const pool = new Pool(node_env === 'production' ? herokuConfig : localConfig);


module.exports = {
    query: (text, params) => {
        return pool.query(text, params);
    }
}