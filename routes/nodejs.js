const express = require('express');
const userRouter = require('./user');

let router = express.Router();

router.use('/user', userRouter);

router.get('/index', (req, res) => {
    res.redirect('/nodejs/index.html');
})
router.get('/login', (req, res) => {
    res.redirect('/nodejs/login.html');
})
router.get('/register', (req, res) => {
    res.redirect('/nodejs/register.html');
})

module.exports = router;