module.exports.flash_message = function (req, res, next) {
  //console.log("middleware clicked");
  res.locals.flash = {
    sucess: req.flash("sucess"),
    error: req.flash("error"),
  };
  next();
};
