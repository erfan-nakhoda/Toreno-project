const autoBind = require("auto-bind");
const AuthService = require("./authentication.service");
const createHttpError = require("http-errors");
const AuthMessages = require("../../common/Messages/Auth.messages");
const globalNames = require("../../common/globalNames/global.globalNames");
const { TokenMaker, VerifyToken } = require("../../common/Token/Jwt.token");

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
            const payload = await this.#service.CheckOTP(code, number);
            const accessToken = TokenMaker(payload)
            res.cookie(globalNames.access_Token, accessToken);
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
            const {access_Token} = req.cookies;            
            if(!access_Token) throw new createHttpError.NotFound(AuthMessages.NotFound);
            res.clearCookie(globalNames.access_Token);
            return res.status(200).send({
                message : AuthMessages.LogOUTSuccess,
                statusCode : res.statusCode
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new AuthController();