const { Router } = require("express");
const userController = require("./user.controller");
const { UserCheckLoginGuard } = require("../../common/guards/UserGuard.guard");

const router = Router();

router.get('/getProfile', UserCheckLoginGuard,userController.getProfile);
router.post('/deposit', UserCheckLoginGuard, userController.deposit);
router.put("/update-info",UserCheckLoginGuard,userController.UpdateInfo);
router.put('/update-credit-info', UserCheckLoginGuard, userController.UpdateCreditInfo)
module.exports = {
    UserRoutes : router
}