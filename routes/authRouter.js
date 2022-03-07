const Usermodel = require('../models/UserModel');
const authRouter = require('express').Router();
const userInstance = new Usermodel();

authRouter.post('/register', async (req, res) => {
    let data = req.body
//Check if email exists   
        let userCheck = await userInstance.getByEmail(data.email);
        if(userCheck.rows.length > 0){
           return res.status(400).send('Email already in use');
        } 
//Create new user
    try{
        await userInstance.create(data);
        res.status(201).send('user created')
    } catch(err) {
        res.status(400).send(err);
    }
    
})

module.exports = authRouter;