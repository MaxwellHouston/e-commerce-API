const { query } = require('../DB/db');

module.exports = class Productmodel {

    async getAllProducts() {
        try{
            const result = await query('SELECT * FROM product',[]);
            return result.rows;
        } catch(err){
            throw err.stack;
        }
    }

    async getProductById(data) {
        try{
            const text = 'SELECT * FROM product WHERE id = $1';
            const inputs = [data];
            const result = await query(text, inputs);
            return result.rows[0];
        } catch(err) {
            throw err.stack;
        }
    }

    async getProductsByCategory(data) {
        try{
            const text = 'SELECT * FROM product WHERE category = $1';
            const inputs = [data];
            const result = await query(text, inputs);
            return result.rows;
        } catch(err) {
            throw err.stack;
        }
    }
}