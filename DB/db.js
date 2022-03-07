const Pool = require('pg').Pool;
const {dbLogin} = require('../config');

const pool = new Pool(
    {
        user: dbLogin.user,
        host: dbLogin.host,
        database: dbLogin.database,
        password: dbLogin.password,
        port: dbLogin.port
    }
)


module.exports = {
    query: (text, params) => {
        return pool.query(text, params);
    }
}