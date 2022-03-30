const cartRouter = require('express').Router();
const Cartmodel = require('../models/CartModel');
const productCartRouter = require('./productCartRouter');
const { checkAuthentication } = require('../passportConfig');

const cartInstance = new Cartmodel();

//Id check middleware
cartRouter.use('/:id', checkAuthentication, async (req, res, next) => {
    try{
        const cart = await cartInstance.getCartById(req.params.id);
        if(!cart) return res.status(400).send('No cart found');
        if(cart.user_id !== req.user.id) return res.status(400).send('No cart found');
        req.cart = cart;
        next();
    } catch(err) {
        res.status(400).send(err);
    }
})

//Product cart router
cartRouter.use('/:id/items', productCartRouter);


// Get all carts for user_id
cartRouter.get('/', checkAuthentication, async (req, res) => {
    try {
        const userCarts = await cartInstance.getCartsByUserId(req.user.id);
        if(userCarts.length === 0) return res.status(400).send('No carts found');
        res.json(userCarts);
    } catch(err) {
        res.status(400).send(err);
    }
})

// Get cart by cart id
cartRouter.get('/:id', (req, res) => {
    res.json(req.cart);
})

//Create new cart
cartRouter.post('/', checkAuthentication, async (req, res) => {
    try{
        const newCart = await cartInstance.create(req.user.id);
        if(!newCart) return res.status(400).send('Invalid user_id');
        res.status(201).send('Cart created');
    } catch(err) {
        res.status(400).send(err);
    }
})

//Delete cart
cartRouter.delete('/:id', async (req, res) => {
    try{
        await cartInstance.deleteCart(req.cart.id);
        res.status(204).send();
    } catch(err) {
        res.status(400).send(err)
    }
})

//Checkout
cartRouter.get('/:id/checkout', async (req, res) => {
    try {
        const result = await cartInstance.checkout({user_id: req.user.id, cart_id: req.cart.id});
        if(result === 'empty') return res.status(400).send('Cart empty. No order created');
        if(result === 'payment') return res.status(400).send('Payment not processed');
        res.json({"order_id": result});
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = cartRouter;