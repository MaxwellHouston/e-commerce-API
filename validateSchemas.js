const { Joi } = require('express-validation')

module.exports = {

    registerSchema: {
        body: Joi.object({
            firstName: Joi.string().trim().alphanum().required(),
            lastName: Joi.string().trim().alphanum().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        })
    },
    loginSchema: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        })
    }
}