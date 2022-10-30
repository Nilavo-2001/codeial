const userCollection = require("../models/user");
module.exports.profile = function (req, res) {
  //console.log(req.user);
  return res.render("user_profile", {
    title: "User Profile",
  });
};
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "codeial | Sign in",
  });
};
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
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
// sign-in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};
module.exports.deleteSession = function (req, res) {
  req.logout((err) => {
    if (err) {
      console.log("Unable to log out");
      return res.redirect("back");
    }
    return res.redirect("/");
  });
};
