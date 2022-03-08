const cartRouter = require('express').Router();
const { verifyTokenId } = require('../functions_schemas/validateFunctions');
const Cartmodel = require('../models/CartModel');
const productCartRouter = require('./productCartRouter');

const cartInstance = new Cartmodel();


//Product cart router
cartRouter.use('/items', productCartRouter);


//Validation Middleware
cartRouter.use('/', async (req, res, next) => {
    try {
        const id = await verifyTokenId(req.headers.login_token);
        req.id = id;
        next();
    } catch(err) {
        res.status(400).send('Invalid login_token');
    }
})

// Get all carts for user_id
cartRouter.get('/', async (req, res) => {
    try {
        const userCarts = await cartInstance.getCartsByUserId(req.id);
        if(userCarts.length === 0) return res.status(400).send('No carts found');
        res.json(userCarts);
    } catch(err) {
        res.status(400).send(err);
    }
})

// Get cart by cart id
cartRouter.get('/:id', async (req, res) => {
    try{
        const userCart = await cartInstance.getCartById(req.params.id);
        if(!userCart) return res.status(400).send('No cart found');
        if(userCart.user_id !== req.id) return res.status(400).send('Cannot access another users carts');
        res.json(userCart); 
    } catch(err) {
        res.status(400).send(err);
    }
})

//Create new cart
cartRouter.post('/', async (req, res) => {
    try{
        const newCart = await cartInstance.create(req.id);
        if(!newCart) return res.status(400).send('Invalid user_id');
        res.status(201).send('Cart created');
    } catch(err) {
        res.status(400).send(err);
    }
})










module.exports = cartRouter;