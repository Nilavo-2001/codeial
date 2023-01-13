const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("router loaded");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./post"));
router.use("/comment", require("./comment"));
router.use("/api", require("./api/index"));
router.use("/forgot-password", require("./forgot_password"));
router.use("/likes", require("./like"));
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

module.exports = router;
