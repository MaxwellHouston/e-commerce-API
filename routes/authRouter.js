const Usermodel = require('../models/UserModel');
const { registerSchema, loginSchema } = require('../functions_schemas/validateSchemas');
const { token_secret } = require('../config');
const { hashPassword, verifyPassword } = require('../functions_schemas/validateFunctions');

const { validate, ValidationError } = require('express-validation');
const jwt = require('jsonwebtoken');

const userInstance = new Usermodel();
const authRouter = require('express').Router();


//Autherization Routes

authRouter.post('/register', validate(registerSchema), async (req, res) => {
    let data = req.body
    //Check if email exists   
    let userCheck = await userInstance.getByEmail(data.email);
    if(userCheck){
       return res.status(400).send('Email already in use');
    }
    //Hash password

    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;
        
    //Create new user
    try{
        await userInstance.create(data);
        res.status(201).send('User created')
    } catch(err) {
        res.status(400).send(err);
    }
    
})

authRouter.post('/login', validate(loginSchema), async (req, res) => {
    let data = req.body;

    //Check for user
    let user = await userInstance.getByEmail(data.email);
    if(!user) return res.status(400).send('Email/Password not found');

    //Validate password
    const validPassword = await verifyPassword(data.password, user.password);
    if(!validPassword) return res.status(400).send('Email/Password not found');
    
    //Assign token
    const token = jwt.sign({email: data.email, id: user.id}, token_secret);

    res.header('login_token', token).send('Login successful');

})

//Catch validation errors
authRouter.use((err, req, res, next) => {
    if(err instanceof ValidationError) return res.status(err.statusCode).json(err);
    next();
});

module.exports = authRouter;