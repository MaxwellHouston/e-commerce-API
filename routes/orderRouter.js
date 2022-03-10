const orderRouter = require('express').Router();
const Ordermodel = require('../models/OrderModel');
const { verifyTokenId } = require('../functions_schemas/validateFunctions');

const orderInstance = new Ordermodel();

//Validate token
orderRouter.use('/', async (req, res, next) => {
    try {
        const id = await verifyTokenId(req.headers.login_token);
        req.userId = id;
        next();
    } catch(err) {
        res.status(400).send('Invalid login_token');
    }
})

//Check order id
orderRouter.use('/:id', async (req, res, next) => {
    try{
        const order = await orderInstance.getOrderById(req.params.id);
        if(!order) return res.status(400).send('No order found');
        if(order.user_id !== req.userId) return res.status(400).send('No order found');
        req.order = order;
        next();
    } catch(err) {
        res.status(400).send(err);
    }
})

//Get all orders
orderRouter.get('/', async (req, res) => {
    try {
        const result = await orderInstance.getAllOrders(req.userId);
        if(result.length === 0) return res.status(400).send('No orders found');
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
})

//Get order by id
orderRouter.get('/:id', async (req, res) => {
    res.json(req.order);
})


module.exports = orderRouter;