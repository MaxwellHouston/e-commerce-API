const userRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { validate, ValidationError } = require('express-validation');

const { token_secret } = require('../config');
const UserModel = require('../models/UserModel');
const { updateSchema } = require('../functions_schemas/validateSchemas');
const { hashPassword, verifyToken } = require('../functions_schemas/validateFunctions');


const userInstance = new UserModel();


//Token Middleware
userRouter.use(async (req, res, next) => {
    try{
        const email = await verifyToken(req.headers.login_token);
        req.email = email;
        next();
        } catch(err) {
            res.status(400).send('Invalid login_token');
        };        
})

// Input validation
userRouter.use('/update', validate(updateSchema), (err, req, res, next) => {
    if(err instanceof ValidationError) return res.status(err.statusCode).json(err);
    next();
})    


// Routes
userRouter.get('/', async (req, res) => {
    try {
        const userFetch = await userInstance.getByEmail(req.email);
        const user = userFetch.rows[0];
        user.password = '********';
        res.send(user);
    } catch(err) {
        res.status(400).send(err);
    }
});

userRouter.put('/update', async (req, res) => {
    const data = req.body;

    for(const key in data){
        try{
            let input = {column: key, value: data[key], email: req.email};
            if(key === 'password'){
                let hashedPassword = await hashPassword(input.value);
                input.value = hashedPassword;
            }
            await userInstance.updateByEmail(input);
        } catch(err) {
            return res.status(400).send(err);
        }
    }
    res.send('Update successful');
});

module.exports = userRouter;
