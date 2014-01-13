
exports.authorize = function(callback, redirects) {
  return function(req, res) {
    if (redirects.failureRedirect !== undefined &&
	req.session.uid === undefined) {
      res.redirect(redirects.failureRedirect);
      return;
    }
    if (redirects.successRedirect !== undefined &&
	req.session.uid !== undefined) {
      res.redirect(redirects.successRedirect)
      return;
    }
    callback(req, res);
  }
};
