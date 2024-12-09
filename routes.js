const { Router } = require("express");
const { AuthRoutes } = require("./src/modules/Authentication/authentication.routes");
const { UserRoutes } = require("./src/modules/Users/user.routes");
const { TourRoutes } = require("./src/modules/Tours/tour.routes");
const { AdminRoutes } = require("./src/modules/admin/admin.routes");

const mainrouter = Router();
mainrouter.use("/auth", AuthRoutes);
mainrouter.use('/user', UserRoutes);
mainrouter.use('/tour', TourRoutes);
mainrouter.use('/admin', AdminRoutes);

module.exports = {
    AllRoutes: mainrouter
}