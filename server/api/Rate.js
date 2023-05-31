const router = require('express').Router()
const mysql = require('./../mysql')
const Rate = require('./../mysql/collection/Rate')
const uuid = require('uuid')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
router.get('/', (req, res, next) => {
    res.send('用户相关接口')
})
router.post("/add", (req, res, next) => {
    let insertData = req.body
    insertData.rateid = "rate_" + uuid.v4()
    console.log(insertData.rateid);
    mysql.insert(Rate, insertData).then(data => {
        res.send({
            code: '200',
            message: '评价成功'
        })
    })
})
module.exports = router