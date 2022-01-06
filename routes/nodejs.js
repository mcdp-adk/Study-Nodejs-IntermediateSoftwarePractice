const express = require('express');
const userRouter = require('./user');
const uploadRouter = require('./upload');
const orderRouter = require('./manage');

let router = express.Router();

router.use('/user', userRouter);
router.use('/upload', uploadRouter);
router.use('/manage', orderRouter);

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
router.get('/order', (req, res) => {
    res.redirect('/nodejs/order.html');
})
router.get('/search', (req, res) => {
    res.redirect('/nodejs/search.html');
})

module.exports = router;