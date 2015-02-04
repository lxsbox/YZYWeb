var db = require('mongous').Mongous;
function User(user){
    this.username = user.username;
    this.userpass = user.userpass;

    this.save = function save(callback){
        console.log("insert username:"+this.username);
        try{
                db('testWeb.login').insert({username:this.username,userpwd:this.userpass});
                callback(0)
            }
        catch(e){
            callback(1);
        }
    }

    this.getUserNumByUserName = function getUserNumByUserName(username,callback){
        db('testWeb.login').find({username:username},function(result){
            var userResult = result['documents'];
            var count = userResult.length;
            console.log("count:"+count);
            callback(count);
        });
    }
};

module.exports = User;