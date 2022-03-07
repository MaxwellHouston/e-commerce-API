const { query } = require('../DB/db');

module.exports = class Usermodel {

    async create(data) {
        let text = 'INSERT INTO users (first_name, last_name, email, password, created) VALUES($1, $2, $3, $4, current_timestamp);';
        let inputs = [data.firstName, data.lastName, data.email, data.password];
        try{
            return await query(text, inputs);
        } catch (err) {
            throw err.stack; 
        }
    }

    async getByEmail(data) {
        let text = 'SELECT * FROM users WHERE email = $1';
        let inputs = [data];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    

}