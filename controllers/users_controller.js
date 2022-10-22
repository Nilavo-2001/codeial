const userCollection = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "codeial | Sign in",
  });
};
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "codeial | Sign up",
  });
};
module.exports.create = function (req, res) {
  console.log(req.body.confirm_password);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  userCollection.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      userCollection.create(req.body, (err, user) => {
        if (err) {
          console.log("Error in Creating user while signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {};
