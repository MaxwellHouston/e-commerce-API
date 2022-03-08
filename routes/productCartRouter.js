const productCartRouter = require('express').Router({mergeParams: true});
const cartInstance = require('../models/CartModel');




//Add product to cart
productCartRouter.post('/', (req, res) => {

})

module.exports = productCartRouter;