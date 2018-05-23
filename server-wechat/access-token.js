/**
 * [express description]
 * @file
 * @author Yangholmes 2018-05-23
 */

const https = require('https');
const config = require('./wechat.config.json');
const apis = require('./apis.js');

module.exports = () => new Promise((resolve, reject) => {
    https.get(`${apis.token}?grant_type=client_credential&appid=${config.appID}&secret=${config.appSecret}`, res => {
        let status = res.statusCode;
        if (status === 200) {
            res.on('data', d => {
                let data = d.toString('utf8');
                data = JSON.parse(data);
                if (!data.errcode) {
                    data = Object.assign({}, data, {
                        expires: new Date().getTime() + data['expires_in'] * 1000
                    });
                    resolve(data);
                }
                else {
                    reject(data);
                }
            });
        }
        else {
            reject(new Error('response is not ok.'));
        }
    }).on('error', (e) => {
        reject(e);
    });
});
