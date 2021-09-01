const express = require("express");

const authController = require("../controllers/auth");
const userController = require("../controllers/user");

const router = express.Router();

router.route("/").get(authController.signIn);

router.route("/signup").post(authController.signUp);

router.route("/signin").post(authController.signIn);

router.route("/me").get(authController.protect, userController.getSignedUser);

module.exports = router;
