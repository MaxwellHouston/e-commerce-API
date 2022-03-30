const userRouter = require('express').Router();
const { validate, ValidationError } = require('express-validation');

const UserModel = require('../models/UserModel');
const { updateSchema } = require('../functions_schemas/validateSchemas');
const { hashPassword } = require('../functions_schemas/validateFunctions');
const { checkAuthentication } = require('../passportConfig');

const userInstance = new UserModel();

// Input validation
userRouter.use('/', validate(updateSchema), (err, req, res, next) => {
    if(err instanceof ValidationError) return res.status(err.statusCode).json(err);
    next();
})    


// Routes
userRouter.get('/', checkAuthentication, async (req, res) => {
    try {
        res.send(req.user);
    } catch(err) {
        res.status(400).send(err);
    }
});

userRouter.put('/', checkAuthentication, async (req, res) => {
    const data = req.body;

    for(const key in data){
        try{
            let input = {column: key, value: data[key], email: req.user.email};
            if(key === 'password'){
                let hashedPassword = await hashPassword(input.value);
                input.value = hashedPassword;
            }
            await userInstance.updateByEmail(input);
        } catch(err) {
            res.status(400).send(err);
        }
    }
    res.send('Update successful');
});

userRouter.delete('/', checkAuthentication, async (req, res) => {
    try {
        await userInstance.deleteByEmail(req.user.email);
    } catch(err) {
        res.status(400).send(err)
    }
    res.status(204).send();
});

module.exports = userRouter;
