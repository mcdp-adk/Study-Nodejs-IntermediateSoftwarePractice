const express = require('express');
const multipart = require('connect-multiparty');
const multipartyMiddleware = multipart();
const MongoClient = require('../db').MongoClient;
const URL = require('../db').URL;

let router = express.Router();

// 查询所有数据
router.post('/find', (req, res) => {
    MongoClient.connect(URL).then(conn => {
        let db = conn.db('store');
        db.collection('good').find(req.body).toArray().then(result => {
            res.json(result)
        }).finally(() => {
            conn.close();
        })
    }).catch(() => {
        console.log('数据库连接错误')
    })
})

// 存入图片
router.post('/insert', multipartyMiddleware, (req, res) => {
    MongoClient.connect(URL, function (err, db) {
        let dbo = db.db('store');
        dbo.collection('good').insertOne(req.body, function (err) {
            if (err) res.send('0');
            res.send('1');
            db.close();
        })
    })
})

// 删除数据
router.post('/delete', (req, res) => {
    MongoClient.connect(URL).then(conn => {
        let db = conn.db('store');
        db.collection('good').deleteOne(req.body, error => {
            if (error) throw error;
            conn.close();
        })
    })
})

// 加入购物车
router.post('/toChart', (req, res) => {
    console.log(req.session);
    if (!req.session.goods) {
        req.session.goods = [];
        req.session.goods.push(req.body.gname);
    }else {
        req.session.goods.push(req.body.gname);
    }
    console.log(req.session);
})

module.exports = router;