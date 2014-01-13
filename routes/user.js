var crypto = require("crypto");
var mongoose = require('mongoose');

var domain = 'localhost';
var url = 'mongodb://' + domain + '/node-login-system';

var db = mongoose.createConnection(url, function(err, res) {
  if (err) {
    console.log('Error connected: ' + url + ' - ' + err);
  } else {
    console.log('success connected: ' + url);
  }
});

var UserSchema = new mongoose.Schema({
  uid : String,
  password : String
},{collection: 'users'});

var User = db.model('User', UserSchema);

exports.hashPassword = function(password) {
  var shasum = crypto.createHash("sha256");
  shasum.update(password);
  return shasum.digest("hex");
};

exports.signup = function(uid, hashedPassword, callback) {
  User.findOne({'uid' : uid}, function(err, user) {
    if (user !== null) {
      callback(false);
    } else {
      var newUser = new User();
      newUser.uid = uid;
      newUser.password = hashedPassword;
      newUser.save(function(err) {
	if (err) {
	  callback(false);
	} else {
	  callback(true);
	}
      })
    }
  });
};

exports.signin = function(uid, password, callback) {
  User.findOne({'uid' : uid, 'password' : password}, function(err, user) {
    if (user !== null && uid === user.uid && password === user.password) {
      callback(true);
    } else {
      callback(false);
    }
  });
};
