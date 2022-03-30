const Usermodel = require('../models/UserModel');
const { registerSchema, loginSchema } = require('../functions_schemas/validateSchemas');
const { hashPassword } = require('../functions_schemas/validateFunctions');
const { validate, ValidationError } = require('express-validation');
const passport = require('passport');

const userInstance = new Usermodel();
const authRouter = require('express').Router();



//Autherization Routes

authRouter.post('/register', validate(registerSchema), async (req, res) => {
    if(req.user) return res.status(400).json({message: 'Please log out to create a new user.'});
    let data = req.body;
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
    
});

authRouter.post('/login', validate(loginSchema), passport.authenticate('local', {failureFlash: true}), (req, res) => {
    const user = req.user;
    console.log(user);
    res.json({message: `${user.first_name} is logged in`});
});

authRouter.get('/logout', (req, res) => {
    req.logout();
    res.json({message: 'User logged out'});
})

//Catch validation errors
authRouter.use((err, req, res, next) => {
    if(err instanceof ValidationError) return res.status(err.statusCode).json(err);
    next();
});

module.exports = authRouter;