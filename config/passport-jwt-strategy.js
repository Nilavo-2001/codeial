const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");
// main use of this strategy is to decrypt the jwt token
let opts = {
  // the jwt token is send by the user in req  with header so we extract it from there
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "codeial", // key used for encryption of project
};

passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    // after decrypting the jwt token the jwtPayload will contain the user document that was passed during creating the token
    User.findById(jwtPayLoad._id, function (err, user) {
      // if the user extracted from the jwt exsists then authentication is sucessfull
      if (err) {
        console.log("Error in finding user from JWT");
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
