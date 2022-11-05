const express = require("express");
const commentController = require("../controllers/comment_controller");
const router = express.Router();
const passport = require("passport");
console.log("I am here");
router.post("/create", passport.checkAuthentication, commentController.create);
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  commentController.destroy
);
module.exports = router;
