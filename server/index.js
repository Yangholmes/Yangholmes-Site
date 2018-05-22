/**
 * [express description]
 * @file
 * @author Yangholmes
 */
const express = require('express');
const app = express();
const crypto = require('crypto');
const config = require('./wechat.config.js');

app.get('/wechat', (req, res) => {
    let query = {
        signature: req.query.signature, // 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
        timestamp: req.query.timestamp, // 时间戳
        nonce: req.query.nonce, // 随机数
        echostr: req.query.echostr// 随机字符串
    };
    let tmpStr = [config.token, query.timestamp, query.nonce].sort().join('');
    const hash = crypto.createHash('sha1');
    tmpStr = hash.update(tmpStr, 'utf8').digest('hex');
    console.log(query.signature, tmpStr);

    let result = tmpStr === query.signature ? query.echostr : 'error';
    res.send(result);
});

let server = app.listen(80, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log('listening at port: ' + port);
});
