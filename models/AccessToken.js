/**
 * Created by wei on 2015/2/3.
 */
var https = require('https');
var db = require('mongous').Mongous;
function AccessToken(){
    this.AcessToke;
    this.ExpiresTime;

    this.getAcceessToken = function getAcceessToken(callback){
        try{
        var options = {
            hostname: 'api.weixin.qq.com',
            port: 443,
            path: '/cgi-bin/token?grant_type=client_credential&appid=wx231a7bca5ef6f2c3&secret=4e36a1e57e1f8cac88d899e15df890d6',
            method: 'GET'
        };

        var req = https.request(options, function(res) {
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);

            res.on('data', function(d) {
                var jsonStr = JSON.parse(d);
                console.log("Token:"+jsonStr.access_token);
                console.log("ExpireTime:"+jsonStr.expires_in);
                //process.stdout.write(d);
                callback(jsonStr);
            });
        });
        req.end();

        req.on('error', function(e) {
            console.error(e);
        });
        }
        catch(e){
            callback("20001");
        }
    };

    this.saveToken = function saveToken(accessToken,callback){
        try{
            db('YZYWX.AccToken').find({},function(result){
                var content = result["documents"];
                if(content.length>0){
                    console.log("remove data");
                    db('YZYWX.AccToken').remove({});
                }
                db('YZYWX.AccToken').insert({accToken:accessToken.access_token,expTime:accessToken.expires_in});
                callback("0");
            });


        }
        catch(e){
            callback("10000");
        }
    }

};

module.exports = AccessToken;


