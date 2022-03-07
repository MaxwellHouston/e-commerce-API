const Productmodel = require('../models/ProductModel');
const productRouter = require('express').Router();

const productInstance = new Productmodel();


productRouter.get('/', async (req, res) => {

    try{
        const productList = await productInstance.getAllProducts();
        res.json(productList); 
    } catch(err){
        res.status(400).send(err);
    }
})

productRouter.get('/:id', async (req, res) => {

    let id = req.params.id;

    try {
        const product = await productInstance.getProductById(id);
        if(!product) return res.status(404).send('Invalid product number');
        res.json(product);
    } catch(err) {
        res.status(400).send(err);
    }
})

productRouter.get('/categories/:category', async (req, res) => {
    
    let category = req.params.category;

    try {
        const productList = await productInstance.getProductsByCategory(category);
        if(productList.length === 0) return res.status(404).send('Invalid category');
        res.json(productList);
    } catch(err) {
        res.status(400).send(err);
    }
})

module.exports = productRouter;