const userRouter = require('express').Router();
const { validate, ValidationError } = require('express-validation');

const UserModel = require('../models/UserModel');
const { updateSchema } = require('../functions_schemas/validateSchemas');
const { hashPassword, verifyTokenEmail } = require('../functions_schemas/validateFunctions');


const userInstance = new UserModel();


//Token Middleware
userRouter.use(async (req, res, next) => {
    try{
        const email = await verifyTokenEmail(req.headers.login_token);
        req.email = email;
        next();
        } catch(err) {
            res.status(400).send('Invalid login_token');
        };        
})

// Input validation
userRouter.use('/', validate(updateSchema), (err, req, res, next) => {
    if(err instanceof ValidationError) return res.status(err.statusCode).json(err);
    next();
})    


// Routes
userRouter.get('/', async (req, res) => {
    try {
        const user = await userInstance.getByEmail(req.email);
        user.password = '********';
        res.send(user);
    } catch(err) {
        res.status(400).send(err);
    }
});

userRouter.put('/', async (req, res) => {
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
            res.status(400).send(err);
        }
    }
    res.send('Update successful, remember to login again if email changed');
});

userRouter.delete('/', async (req, res) => {
    try {
        await userInstance.deleteByEmail(req.email);
    } catch(err) {
        res.status(400).send(err)
    }
    res.status(204).send();
});

module.exports = userRouter;
