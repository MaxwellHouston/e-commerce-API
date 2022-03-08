const Usermodel = require('../models/UserModel');
const { registerSchema, loginSchema } = require('../functions_schemas/validateSchemas');
const { token_secret } = require('../config');
const { hashPassword, verifyPassword } = require('../functions_schemas/validateFunctions');

const { validate, ValidationError } = require('express-validation');
const jwt = require('jsonwebtoken');

const userInstance = new Usermodel();
const authRouter = require('express').Router();


//Validation Middleware
authRouter.use('/register', validate(registerSchema), (err, req, res, next) => {
    if(err instanceof ValidationError) return res.status(err.statusCode).json(err);
    next();
});

authRouter.use('/login', validate(loginSchema), (err, req, res, next) => {
    if(err instanceof ValidationError) return res.status(err.statusCode).json(err);
    next();
})


//Autherization Routes

authRouter.post('/register', async (req, res) => {
    let data = req.body
    //Check if email exists   
    let userCheck = await userInstance.getByEmail(data.email);
    if(userCheck.rows.length > 0){
       return res.status(400).send('Email already in use');
    }
    //Hash password

    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;
        
    //Create new user
    try{
        await userInstance.create(data);
        res.status(201).send('user created')
    } catch(err) {
        res.status(400).send(err);
    }
    
})

authRouter.post('/login', async (req, res) => {
    let data = req.body;

    //Check for user
    let user = await userInstance.getByEmail(data.email);
    if(user.rows.length === 0) return res.status(400).send('Email/Password not found');

    //Validate password
    const validPassword = await verifyPassword(data.password, user.rows[0].password);
    if(!validPassword) return res.status(400).send('Email/Password not found');
    
    //Assign token
    const token = jwt.sign({email: data.email, id: user.rows[0].id}, token_secret);

    res.header('login_token', token).send('Login successful');

})


module.exports = authRouter;