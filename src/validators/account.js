const joi = require('@hapi/joi');
const { getValidatorError } = require('../helpers/validator');

const accountSignUp = (req, res, next) => {
    const { name, email, password, password_confirmation } = req.body;

    const schema = joi.object({
        name: joi.string().alphanum().required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        password_confirmation: joi.string().valid(joi.ref('password')).required()
    })

    // 'abortEarly = false' ensures that validation is applied to all fields, returning all errors, not just
    // finding the first error and returning before checking if any other fields are invalid
    const options = { abortEarly: false }
    const { error } = schema.validate({ name, email, password, password_confirmation }, options);
    if (error) {
        const messages = getValidatorError(error, 'account.signup');
        return res.jsonBadRequest(null, null, { error: messages });
    }

    next();
};

module.exports = { accountSignUp };