const express = require('express');
const userRouter = require('./user');
const uploadRouter = require('./upload');

let router = express.Router();

router.use('/user', userRouter);
router.use('/upload', uploadRouter);

router.get('/index', (req, res) => {
    res.redirect('/nodejs/index.html');
})
router.get('/login', (req, res) => {
    res.redirect('/nodejs/login.html');
})
router.get('/register', (req, res) => {
    res.redirect('/nodejs/register.html');
})
router.get('/goodsManage', (req, res) => {
    res.redirect('/nodejs/goodsManage.html');
})
router.get('/orderManage', (req, res) => {
    res.redirect('/nodejs/orderManage.html');
})
router.get('/chart', (req, res) => {
    res.redirect('/nodejs/chart.html');
})

module.exports = router;