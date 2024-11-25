const autoBind = require("auto-bind");
const AuthService = require("./authentication.service");
const createHttpError = require("http-errors");
const AuthMessages = require("../../common/Messages/Auth.messages");

class AuthController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = AuthService;
    }

    async SendOTP(req,res,next) {
        try {
            const {number} = req.body;
            await this.#service.SendOTP(number);
            return res.status(201).send({
                message : AuthMessages.OtpSentSuccess,
                statusCode : res.statusCode
            })
        } catch (err) {
            next(err)
        }
    }
    async CheckOTP(req,res,next) {
        try {
            const {code, number} = req.body;
            await this.#service.CheckOTP(code, number);
            return res.status(200).send({
                message : AuthMessages.SuccessLogin,
                statusCode : res.statusCode
            })
        } catch (err) {
            next(err)
        }
    }
    LogOut(req,res,next) {
        try {
            
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new AuthController();