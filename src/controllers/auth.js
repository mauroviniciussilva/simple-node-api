const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { accountSignUp } = require('../validators/account');
const { getMessage } = require('../helpers/messages');

const router = express.Router();
const saltRounds = 10;

router.post('/signin', (req, res) => {
    return res.jsonOk();
});

router.post('/signup', accountSignUp, async (req, res) => {
    const { name, email, password } = req.body;

    const account = await Account.findOne({ where: { email } });
    if (account) return res.jsonBadRequest(null, getMessage('account.signup.email_exists'));

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await Account.create({ name, email , password: hash });
    return res.jsonOK(newAccount, getMessage('account.signup.success'));
});

module.exports = router;