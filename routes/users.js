const express = require("express");
const passport = require("passport");
const router = express.Router();

const usersConrtoller = require("../controllers/users_controller");
router.post(
  "/update/:id",
  passport.checkAuthentication,
  usersConrtoller.update
);
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersConrtoller.profile
);
router.get(
  "/profile",
  passport.checkAuthentication,
  usersConrtoller.selfProfile
);
router.get("/sign-in", usersConrtoller.signIn);
router.get("/sign-up", usersConrtoller.signUp);
router.post("/create", usersConrtoller.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersConrtoller.createSession
);
router.get("/sign-out", usersConrtoller.deleteSession);
module.exports = router;
