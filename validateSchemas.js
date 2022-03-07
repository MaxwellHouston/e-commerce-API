const { Joi } = require('express-validation')

module.exports = {

    userValidation: {
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6)
        })
    },
    loginValidation: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6)
        })
    }
}