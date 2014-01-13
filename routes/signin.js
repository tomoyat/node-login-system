
/*
 * GET and Post home page.
 */
var user = require('./user');
exports.signin = function(req, res){
  var uid = req.body.uid;
  var password = req.body.password;
  if (uid === undefined || password === undefined) {
    res.render('signin');
    return;
  }
  var hashedPassword = user.hashPassword(req.body.password);
  user.signin(uid, hashedPassword, function(flg) {
    if (flg) {
      req.session.uid = uid;
      res.redirect('top');
    } else {
      res.redirect('/');
    }
  });
};
