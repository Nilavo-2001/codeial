const express = require("express");
const commentController = require("../controllers/comment_controller");
const router = express.Router();
const passport = require("passport");
console.log("I am here");
router.post("/create", commentController.create);
module.exports = router;
