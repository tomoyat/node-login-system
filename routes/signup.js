
/*
 * GET home page.
 */
var user = require('./user');
exports.signup = function(req, res){
  var uid = req.body.uid;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  if (uid === undefined || password === undefined
      || confirmPassword === undefined) {
    res.render('signup');
    return;
  }
  if (password !== confirmPassword) {
    res.render('signup');
    return;
  }
  var hashedPassword = user.hashPassword(password);
  user.signup(uid, hashedPassword, function(flg) {
    if (flg) {
      req.session.regenerate(function(err) {
	req.session.uid = uid;
	res.redirect('top');
      });
    } else {
      res.redirect('signup');
    }
  });
};
