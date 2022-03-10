const { query } = require('../DB/db');


module.exports = class Ordermodel {

    async create(data) {
        const text = 'INSERT INTO orders (user_id, status, created) VALUES ($1, $2, current_timestamp) RETURNING id;';
        const inputs = [data, 'PENDING'];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async addProduct(data) {
        const text = 'INSERT INTO order_product (order_id, product_id, price, qty) VALUES ($1, $2, (SELECT price FROM product WHERE id = $2), $3);';
        const inputs = [data.order_id, data.product_id, data.qty];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async updateOrderStatus(data) {
        const text = 'UPDATE orders SET status = $1 WHERE id = $1;';
        const inputs = [data.status, data.order_id];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async getAllOrders(data) {
        const text = 'SELECT * FROM orders WHERE user_id = $1';
        const inputs = [data];
        try {
            const orders = await query(text, inputs);
            
        } catch (err) {
            throw err.stack;
        }
    }
}