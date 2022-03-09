const { query } = require('../DB/db');


module.exports = class Ordermodel {

    async create(data) {
        const text = 'INSERT INTO orders (user_id, status, created) VALUES ($1, PENDING, current_timestamp);';
        const inputs = [data];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }


    async addProduct(data) {
        const text = 'INSERT INTO order_product'
    }




}