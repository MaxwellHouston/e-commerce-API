const { query } = require('../DB/db');


module.exports = class Cartmodel {

    async create(data) {
        const text = 'INSERT INTO cart (user_id, created) VALUES ($1, current_timestamp);';
        const inputs = [data];
        try {
            return await query(text, inputs);
        } catch(err) {
            throw err.stack;
        }
    }

    async getCartsByUserId(data) {
        const text = 'SELECT * FROM cart WHERE user_id = $1;';
        const inputs = [data];
        try {
            const result = await query(text, inputs);
            return result.rows;
        } catch(err) {
            throw err.stack;
        }
    }

    async getCartById(data) {
        const text = 'SELECT * FROM cart WHERE id = $1;';
        const inputs = [data];
        try {
            const result = await query(text, inputs);
            return result.rows[0];
        } catch (err) {
            throw err.stack;
        }
    }

    async addProduct(data) {
        const text = 'INSERT INTO cart_product VALUES ($1, $2, $3)';
        const inputs = [data.cart_id, data.product_id, data.qty];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async getAllProducts(data) {
        const text = 'SELECT product.*, qty FROM product JOIN cart_product ON product_id = id WHERE cart_id = $1;';
        const inputs = [data];
        try {
            const result = await query(text, inputs);
            return result.rows;
        } catch(err) {
            throw err.stack
        }
    }

    async getProductById(data) {
        const text = 'SELECT product.*, qty FROM product JOIN cart_product ON product_id = id WHERE cart_id = $1 AND product_id = $2;';
        const inputs = [data.cart_id, data.product_id];
        try{
            const result = await query(text, inputs);
            return result.rows[0];
        } catch(err) {
            throw err.stack;
        }
    }
}