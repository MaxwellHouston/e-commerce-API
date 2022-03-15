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
     
    token_secret: process.env.TOKEN_SECRET,

    node_env: process.env.NODE_ENV,

    database_url: process.env.DATABASE_URL
}