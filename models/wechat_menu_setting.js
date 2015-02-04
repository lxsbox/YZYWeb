/**
 * Created by wei on 2015/2/3.
 */
var https = require('https');
var db = require('mongous').Mongous;
var querystring = require('querystring');

db('YZYWX.AccToken').find({},function(result){
    var content = result["documents"];
    if(content.length>0){
        access_token = content[0].accToken;
        console.log("accessToken:"+access_token);
		var jj = {"button":[{"type":"view","name":"测量记录","url":"http://www.37ctech.com/showL"}
							,{"type":"view","name":"用药提醒","url":"http://www.37ctech.com/showL"}]
		}
		
		/*var jj = {"button":[{"type":"click","name":"今日歌曲","key":"V1001_TODAY_MUSIC"}
		,{"name":"菜单","sub_button":[{	"type":"view","name":"搜索","url":"http://www.soso.com/"},{"type":"view","name":"视频","url":"http://v.qq.com/"},{"type":"click","name":"赞一下我们","key":"V1001_GOOD"}]}
		]
		}*/
		var bodyString = JSON.stringify(jj);
        var options = {
            hostname: 'api.weixin.qq.com',
            port: 443,
            path: '/cgi-bin/menu/create?access_token='+access_token,
            method: 'POST'
        };

        var req = https.request(options, function(res) {

            res.on('data', function(d) {
                var jsonStr = JSON.parse(d);
                console.log("errcode:"+jsonStr.errcode);
                console.log("errmsg:"+jsonStr.errmsg);
			});
		});
		req.write(bodyString);
		req.end();
		req.on('error', function(e) {
			console.error(e);
		});
	}
});


