/**
 * Created by wei on 2015/2/3.
 */
var https = require('https');
var db = require('mongous').Mongous;

db('YZYWX.AccToken').find({},function(result){
    var content = result["documents"];
    if(content.length>0){
        access_token = content[0].accToken;
        console.log("accessToken:"+access_token);
        var options = {
            hostname: 'api.weixin.qq.com',
            port: 443,
            path: '/device/getqrcode?access_token='+access_token,
            method: 'GET'
        };

        var req = https.request(options, function(res) {
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);

            res.on('data', function(d) {
                var jsonStr = JSON.parse(d);
                console.log("deviceid:"+jsonStr.deviceid);
                console.log("qrticket:"+jsonStr.qrticket);
                db('YZYWX.dev_info').insert({deviceid:jsonStr.deviceid,qrticket:jsonStr.qrticket});
            });
        });
        req.end();

        req.on('error', function(e) {
            console.error(e);
        });
    }
});


