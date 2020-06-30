const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models')

const router = express.Router();
const saltRounds = 10;

router.post('/sign-in', (req, res) => {
    return res.json('Sign in');
});

router.post('/sign-up', async (req, res) => {
    const { name, email, password } = req.body;

    const account = await Account.findOne({ where: { email } });
    if (account) return res.json('Account already exists');

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await Account.create({ name, email , password: hash });
    return res.json(newAccount);
});

module.exports = router;