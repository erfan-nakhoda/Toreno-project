const { Router } = require("express");
const { AuthRoutes } = require("./src/modules/Authentication/authentication.routes");
const { UserRoutes } = require("./src/modules/Users/user.routes");

const mainrouter = Router();
mainrouter.use("/auth", AuthRoutes);
mainrouter.use('/user', UserRoutes)

module.exports = {
    AllRoutes : mainrouter
}