const { Router } = require("express");
const AuthController = require("./authentication.controller");
const { AuthLoginGuard } = require("../../common/guards/AuthGuard.guard");

const router = Router();

router.post('/send-otp',AuthLoginGuard, AuthController.SendOTP);
router.post('/check-otp',AuthLoginGuard, AuthController.CheckOTP);
router.get('/logout', AuthController.LogOut);

module.exports = {
    AuthRoutes : router
}