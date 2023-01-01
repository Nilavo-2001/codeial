const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const mongoose_config = require("./config/mongoose");
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const flash_midware = require("./middlewares/flash_message");

// using sass middleware
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: false,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded()); // used for filling up req.body
app.use(cookieParser());
app.use(express.static("./assets")); // used for serving static files like html css js

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");
// using express-session
app.use(
  session({
    name: "codeial",
    // to do change the secret before deployment
    secret: "blahblah",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/codeial_development",
      autoRemove: "disabled",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(flash_midware.flash_message);
// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
