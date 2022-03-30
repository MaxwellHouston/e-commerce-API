const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,

    dbLogin: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    },

    node_env: process.env.NODE_ENV,

    database_url: process.env.DATABASE_URL,

    session_secret: process.env.SESSION_SECRET
}