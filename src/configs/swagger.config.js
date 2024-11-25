const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");

module.exports =  swaggerConfig = (app) => {
    const jsdoc = swaggerJsDoc({
        swaggerDefinition : {
            openapi : "3.1.0",
            info : {
                version : "1.0.0",
                title : "Torino project",
                description : "Tour management website apies"
            }
        },
        apis : [`${process.cwd()}/src/modules/**/*.swagger.js`]
    })

    app.use("/swagger",swaggerUi.serve,swaggerUi.setup(jsdoc), swaggerUi.serve);
}

