const express = require('express');
const userRouter = require('./user');
const uploadRouter = require('./upload');
const orderRouter = require('./manage');

let router = express.Router();

router.use('/user', userRouter);
router.use('/upload', uploadRouter);
router.use('/manage', orderRouter);

router.get('/index', (req, res) => {
    res.redirect('/javaweb/index.html');
})
router.get('/login', (req, res) => {
    res.redirect('/javaweb/login.html');
})
router.get('/register', (req, res) => {
    res.redirect('/javaweb/register.html');
})
router.get('/goodsManage', (req, res) => {
    res.redirect('/javaweb/goodsManage.html');
})
router.get('/orderManage', (req, res) => {
    res.redirect('/javaweb/orderManage.html');
})
router.get('/chart', (req, res) => {
    res.redirect('/javaweb/chart.html');
})
router.get('/order', (req, res) => {
    res.redirect('/javaweb/order.html');
})
router.get('/search', (req, res) => {
    res.redirect('/javaweb/search.html');
})

module.exports = router;