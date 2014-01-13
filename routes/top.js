
/*
 * GET home page.
 */

exports.top = function(req, res){
  if (req.session.uid === undefined) {
    res.redirect('/');
  }
  res.render('top');
};
