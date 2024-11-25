const { Router } = require("express");
const AuthController = require("./authentication.controller");

const router = Router();

router.post('/send-otp', AuthController.SendOTP);
router.post('/check-otp', AuthController.CheckOTP);

module.exports = {
    AuthRoutes : router
}