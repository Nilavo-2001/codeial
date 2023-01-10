const users = require("../models/user");
const tokens = require("../models/reset-password");
const crypto = require("crypto");
const pr = require("../mailers/password_reset_mailer");
module.exports.fpPage = (req, res) => {
  return res.render("_forgot_password", { title: "Forgot Password" });
};

module.exports.generateToken = async (req, res) => {
  const givenMail = req.body.email;
  const user = await users.findOne({ email: givenMail });
  if (user) {
    let newToken = await tokens.create({
      user: user.id,
      acessToken: crypto.randomBytes(20).toString("hex"),
      isValid: true,
    });
    pr.newPassword(givenMail, newToken.acessToken);

    return res.send("<center><h1>Check Your Email</h1></center>");
  }
  req.flash("error", "email does not exsist");
  return res.redirect("back");
};

module.exports.setPassword = (req, res) => {
  res.render("set_password", {
    title: "Reset Password",
    token: req.params.token,
  });
};

module.exports.resetPassword = async (req, res) => {
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  const token = req.params.token;
  if (password == confirm_password) {
    const userToken = await tokens.findOne({ acessToken: token });
    if (userToken && userToken.isValid) {
      await tokens.populate(userToken, { path: "user" });
      userToken.user.password = password;
      await userToken.user.save();
      userToken.isValid = false;
      await userToken.save();
      req.flash("sucess", "Password Changed Sucessfuly");
      return res.redirect("/users/sign-in");
    } else {
      return res
        .status(403)
        .send("<center><h1>SESSION DOES NOT EXSIST</h1></center>");
    }
  } else {
    req.flash("error", "password and confrim password are not same");
    return res.redirect("back");
  }
};
