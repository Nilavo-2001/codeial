const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const env = require("../../../config/environment")
// a session is created after checking the email and password
module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(req.body.email, req.body.password);
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }

    return res.json(200, {
      message: "Sign in successful, here is your token, please keep it safe!",
      data: {
        // a token is created with information as the entire user and enc codeial and expiry time
        token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "1000000" }),
      },
    });
  } catch (err) {
    console.log("********", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
