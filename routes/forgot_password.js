const express = require("express");
const router = express.Router();
const fp = require("../controllers/forgot_password_controller");

router.get("/", fp.fpPage);
router.post("/check-email", fp.generateToken);
router.get("/set-password/:token", fp.setPassword);
router.post("/reset-password/:token", fp.resetPassword);
module.exports = router;
