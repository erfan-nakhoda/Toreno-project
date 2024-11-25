const { Router } = require("express");
const { AuthRoutes } = require("./src/modules/Authentication/authentication.routes");

const mainrouter = Router();
mainrouter.use("/user", AuthRoutes)

module.exports = {
    AllRoutes : mainrouter
}