var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AccessToken = require('./models/AccessToken.js');

var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/*自动更新Acceess Token*/
function GetAcceessToken(){
    var newAccessToken = new AccessToken();
    newAccessToken.getAcceessToken(function(result){
        if(result.access_token){
            newAccessToken.saveToken(result,function(result){
                if(result ==0){
                    console.log("Insert AccToken Success");
                }
                else{
                    console.log("Insert AccToken Failed:"+result);
                }
            })
        }
        else{
            console.log("Get AccToken Failed:"+result);
        }
    });
};
GetAcceessToken();
setInterval(GetAcceessToken,60*60*1000);

app.listen(80);
console.log("Server start listen port 80");

module.exports = app;
