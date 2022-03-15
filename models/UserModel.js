const { query } = require('../DB/db');
const format = require('pg-format');

module.exports = class Usermodel {

    async create(data) {
        let text = 'INSERT INTO users (first_name, last_name, email, password, created) VALUES($1, $2, $3, $4, current_timestamp);';
        let inputs = [data.first_name, data.last_name, data.email, data.password];
        try{
            return await query(text, inputs);
        } catch (err) {
            throw err.stack; 
        }
    }

    async getByEmail(data) {
        let text = 'SELECT * FROM users WHERE email = $1;';
        let inputs = [data];
        try {
            const result = await query(text, inputs);
            return result.rows[0];
        } catch (err) {
            throw err.stack;
        }
    }

    async getById(data) {
        let text = 'SELECT * FROM users WHERE id = $1;';
        let inputs = [data];
        try {
            const result = await query(text, inputs);
            return result.rows[0];
        } catch(err) {
            throw err.stack;
        }
    }

    async updateByEmail(data) {
        let text = format('UPDATE users SET %I = $1 WHERE email = $2;', data.column);
        let inputs = [data.value, data.email];
        try{
            return await query(text, inputs);
        } catch(err) {
            throw err.stack;
        }
    }

    async deleteByEmail(data) {
        let text = 'DELETE FROM users WHERE email = $1;';
        let inputs = [data];
        try{
            return await query(text, inputs);
        } catch(err) {
            throw err.stack;
        }
    }

    

}