const express = require('express');
const MongoClient = require('../db').MongoClient;
const URL = require('../db').URL;

let router = express.Router();

// 将 session 中的购物车存入数据库
router.get('/insert', (req, res) => {
    if (!req.session.uname) {
        res.redirect('/javaweb/login');
    } else {
        let obj = {};
        obj.uname = req.session.uname;
        obj.goods = req.session.goods;
        MongoClient.connect(URL, function (err, db) {
            let dbo = db.db('store');
            dbo.collection('order').insertOne(obj, function (err) {
                if (err) res.send('0');
                res.send('1');
                db.close();
            })
        })
        req.session.goods = [];
        res.redirect('/javaweb/orderManage');
    }
})

// 查询订单
router.post('/find',(req, res) => {
    MongoClient.connect(URL).then(conn => {
        let db = conn.db('store');
        db.collection('order').find(req.body).toArray().then(result => {
            res.json(result)
        }).finally(() => {
            conn.close();
        })
    }).catch(() => {
        console.log('数据库连接错误')
    })
})

module.exports = router;