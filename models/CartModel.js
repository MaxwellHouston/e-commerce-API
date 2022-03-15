const { query } = require('../DB/db');
const Ordermodel = require('../models/OrderModel');

const orderInstance = new Ordermodel();

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

    async deleteCart(data) {
        const text = 'DELETE FROM cart WHERE id = $1;';
        const inputs = [data];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack
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

    async updateProductQty(data) {
        const text = 'UPDATE cart_product SET qty = $1 WHERE cart_id = $2 AND product_id = $3;';
        const inputs = [data.qty, data.cart_id, data.product_id];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async deleteProductById(data) {
        const text = 'DELETE FROM cart_product WHERE cart_id = $1 AND product_id = $2;';
        const inputs = [data.cart_id, data.product_id];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async checkout(data) {
        try {
            const products = await this.getAllProducts(data.cart_id);
            if(products.length === 0) return null;
            const newOrder = await orderInstance.create(data.user_id);
            const orderId = newOrder.rows[0].id;
            for(const item of products){
                let data = {
                    order_id: orderId,
                    product_id: item.id,
                    qty: item.qty
                }
                await orderInstance.addProduct(data);
            }
            return orderId;
        } catch (err) {
            throw err;
        }
        
    }
}