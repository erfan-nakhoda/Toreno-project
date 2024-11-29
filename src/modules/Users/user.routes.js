const { Router } = require("express");
const userController = require("./user.controller");
const { UserCheckLoginGuard } = require("../../common/guards/UserGuard.guard");

const router = Router();

router.get('/getProfile', UserCheckLoginGuard,userController.getProfile);
router.post('/deposit', UserCheckLoginGuard, userController.deposit);
router.put("/update",UserCheckLoginGuard,userController.UpdateInfo);
module.exports = {
    UserRoutes : router
}