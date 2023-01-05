const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
// authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    // the function defined to check if the user exsists and then creating a session for the user
    function (email, password, done) {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log("error in finding user---> passport");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }

        return done(null, user); // passing the user so the session can be created
      });
    }
  )
);
// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// deserializing or extracting the user from the cookie coming in with every re from browser after auth
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding user---> passport");
      return done(err);
    }
    return done(null, user);
  });
});
// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // this is the most crutial function of authentication which will very the session for every requests
  if (res.locals.user) {
    console.log("Profile page found");
    return next();
  }
  console.log("Profile page not found");
  // if the user is not signed in
  return res.redirect("/users/sign-in");
};
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
