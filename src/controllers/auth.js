const express = require('express');

const router = express.Router();

router.post('/sign-in', (req, res) => {
    return res.json('Sign in');
});

router.post('/sign-up', (req, res) => {
    return res.json('Sign up');
});

module.exports = router;