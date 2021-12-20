const express = require('express');
const MongoClient = require('../db').MongoClient;
const URL = require('../db').URL;

let router = express.Router();

// 查询用户名是否被占用
router.post('/uname', (req, res) => {
    let uname = req.body.uname;

    // // 普通回调
    // MongoClient.connect(URL, function (err, db) {
    //     let dbo = db.db('store');
    //     let str = {'uname': uname};
    //     dbo.collection('user').find(str).toArray(function (err, result) {
    //         if (err) throw err;
    //         if (result.length > 0) {
    //             res.send('1');
    //         } else {
    //             res.send('0');
    //         }
    //         db.close();
    //     })
    // })
    // promise 回调
    MongoClient.connect(URL).then(conn => {
        let db = conn.db('store');
        db.collection('user').find(req.body).toArray().then(result => {
            if (result.length > 0) {
                res.send('1');
            } else {
                res.send('0');
            }
        }).finally(() => {
            conn.close();
        })
    }).catch(() => {
        console.log('数据库连接错误')
    })
})

// 查询密码是否正确
router.post('/upwd', (req, res) => {
    // promise 回调
    MongoClient.connect(URL).then(conn => {
        let db = conn.db('store');
        let str = {'uname': req.body.uname};
        db.collection('user').find(str).toArray().then(result => {
            if (result.length > 0) {
                if (result[0].upwd == req.body.upwd) {
                    res.send('1');
                } else {
                    res.send('0');
                }
            }
        }).finally(() => {
            conn.close();
        })
    }).catch(err => {
        console.log(err)
    })
})

// 插入数据
router.post('/insert', (req, res) => {
    MongoClient.connect(URL, function (err, db) {
        let dbo = db.db('store');
        dbo.collection('user').insertOne(req.body, function (err) {
            if (err) res.send('0');
            res.send('1');
            db.close();
        })
    })
})

module.exports = router;