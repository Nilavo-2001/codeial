const userCollection = require("../models/user");
const fs = require("fs");
const path = require("path");
module.exports.selfProfile = async function (req, res) {
  let user = await userCollection.findById(req.user.id);
  return res.render("user_profile", {
    title: "User Profile",
    profile_user: user,
  });
};
module.exports.profile = async function (req, res) {
  //console.log(req.user);
  let user = await userCollection.findById(req.params.id);
  return res.render("user_profile", {
    title: "User Profile",
    profile_user: user,
  });
};
module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    let user = await userCollection.findById(req.user.id);
    userCollection.uploadedAvatar(req, res, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      user.name = req.body.name;
      user.email = req.body.email;
      if (req.file) {
        // checking if a file is uploaded
        if (
          user.avatar &&
          fs.existsSync(path.join(__dirname, "..", user.avatar)) // checking if the file exsists
        ) {
          fs.unlinkSync(path.join(__dirname, "..", user.avatar)); // deleteing the file if it exsists
        }
        user.avatar = userCollection.avatarPath + "/" + req.file.filename;
      }
      user.save(); // updating the document
      return res.redirect("back");
    });
  }
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
module.exports.create = async function (req, res) {
  //console.log(req.body.confirm_password);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  let user = await userCollection.findOne({ email: req.body.email });
  if (!user) {
    await userCollection.create(req.body);
    req.flash("sucess", "signed up sucessfully");
    return res.redirect("/users/sign-in");
  } else {
    return res.redirect("back");
  }
};
// sign-in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash("sucess", "signed in sucessfully");
  return res.redirect("/");
};
module.exports.deleteSession = function (req, res) {
  req.logout((err) => {
    if (err) {
      console.log("Unable to log out");
      return res.redirect("back");
    }
    req.flash("sucess", "signed out sucessful");
    return res.redirect("/");
  });
};
