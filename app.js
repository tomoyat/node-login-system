
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var signup = require('./routes/signup');
var signin = require('./routes/signin');
var top = require('./routes/top');
var logout = require('./routes/logout');
var authorize = require('./routes/authorize');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({
  secret: 'secret',
  store: new MongoStore({
    db: 'node-login-system'
  })
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', authorize.authorize(routes.index, { successRedirect : '/top' }));
app.get('/signup', authorize.authorize(signup.signup, { successRedirect : '/top' }));
app.post('/signup', authorize.authorize(signup.signup, { successRedirect : '/top' }));
app.get('/signin', authorize.authorize(signin.signin, { successRedirect : '/top' }));
app.post('/signin', signin.signin);
app.get('/top', authorize.authorize(top.top, { failureRedirect : '/'}));
app.get('/logout', logout.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
