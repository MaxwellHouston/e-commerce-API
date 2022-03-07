const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,

    dbLogin: {
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.DBPORT
    }
}