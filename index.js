const express = require("express");
const { AllRoutes } = require("./routes");
const { err404Handler, errHandler } = require("./src/common/Exception/errHandler.exception");
const swaggerConfig = require("./src/configs/swagger.config");
const cookieParser = require("cookie-parser");
const { node_mode } = require("./src/common/globalNames/global.globalNames");
const app = express()
require('dotenv').config();

const main = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extends: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET, {
        httpOnly : true,
        secure : node_mode
    }))
    app.use(AllRoutes);
    require("./src/configs/mongoose.config");
    swaggerConfig(app);
    app.use(err404Handler);
    app.use(errHandler);
    app.listen(process.env.PORT, (err) => {
        err ? console.log(err.message) : console.log(`http://localhost:${process.env.PORT}`);
    })
}

main();