const joi = require('@hapi/joi');
const { getValidatorError } = require('../helpers/validator');

const rules = {
    name: joi.string().alphanum().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    password_confirmation: joi.string().valid(joi.ref('password')).required()
};

const options = { abortEarly: false };

function checkError (res, error, messagePath) {
    if (error) {
        const messages = getValidatorError(error, messagePath);
        return res.jsonBadRequest(null, null, { error: messages });
    }
}

const accountSignIn = (req, res, next) => {
    const { email, password } = req.body;
    const schema = joi.object({ email: rules.email, password: rules.password })
    const { error } = schema.validate({ email, password }, options);

    checkError(res, error, 'account.signin');

    next();
};

const accountSignUp = (req, res, next) => {
    const { name, email, password, password_confirmation } = req.body;

    const schema = joi.object({
        name: rules.name,
        email: rules.email,
        password: rules.password,
        password_confirmation: rules.password_confirmation
    });

    const { error } = schema.validate({ name, email, password, password_confirmation }, options);
    
    checkError(res, error, 'account.signup');

    next();
};

module.exports = { accountSignUp, accountSignIn };