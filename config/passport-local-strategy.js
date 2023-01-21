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
      // User.find({}, (err, user) => {
      //   console.log(user);
      // })
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
  done(null, user.id); //this function is applicable for local,google startegy
});
// deserializing or extracting the user from the cookie coming in with every re from browser after auth
passport.deserializeUser(function (id, done) {
  console.log("deserialized user called"); // this function is also called for all startegies
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding user---> passport");
      return done(err);
    }
    // console.log(user);
    return done(null, user);
  });
});
// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  console.log("check authentication called");
  // this is the most crutial function of authentication which will very the session for every requests
  if (res.locals.user) {
    console.log("Profile page found");
    return next();
  }
  console.log("Profile page not found");
  // if the user is not signed in
  return res.redirect("/users/sign-in"); // this is also called for all startegies
};
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.locals.user = req.user;
  }
  next(); // this is also called for both local and google
};

module.exports = passport;
