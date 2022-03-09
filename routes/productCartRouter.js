const productCartRouter = require('express').Router({mergeParams: true});
const CartModel = require('../models/CartModel');

const cartInstance = new CartModel();




//Add product to cart
productCartRouter.post('/', async (req, res) => {
     try {
         const result = await cartInstance.addProduct(req.body);
         res.json(result)
     } catch(err) {
        res.status(400).send(err);
     }
})

//Get products from cart
productCartRouter.get('/', async (req, res) => {
    try{
        const result = await cartInstance.getAllProducts(req.cart.id);
        if(result.length === 0) return res.send('Cart Empty');
        res.json(result);
    } catch(err) {
        res.status(400).send(err);
    }
})

//Get product from cart by id
productCartRouter.get('/:id', async (req, res) => {
    const data = {cart_id: req.cart.id, product_id: req.params.id};
    try {
        const result = await cartInstance.getProductById(data);
        if(!result) return res.status(400).send('Product not found');
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = productCartRouter;