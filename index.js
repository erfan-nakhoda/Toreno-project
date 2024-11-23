const express = require("express");
const { AllRoutes } = require("./routes");
const { err404Handler, errHandler } = require("./src/common/Exception/errHandler.exception");
const app = express()
require('dotenv').config();

const main = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extends: true }));
    app.use(AllRoutes);
    app.use(err404Handler);
    app.use(errHandler);
    app.listen(process.env.PORT, (err) => {
        err ? console.log(err.message) : console.log(`http://localhost:${process.env.PORT}`);
    })
}