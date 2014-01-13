var crypto = require("crypto");

exports.hashPassword = function(password) {
  var shasum = crypto.createHash("sha256");
  shasum.update(password);
  return shasum.digest("hex");
};

var sampleUser = {
  uid : "hoge",
  password : "ecb666d778725ec97307044d642bf4d160aabb76f56c0069c71ea25b1e926825"
};
exports.signin = function(uid, password, callback) {

  if (uid === sampleUser.uid && password == sampleUser.password) {
    callback(true);
  } else {
    callback(false);
  }
};
