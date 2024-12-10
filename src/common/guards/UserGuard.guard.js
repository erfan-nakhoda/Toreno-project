const {userModel} = require("../../modules/Users/user.model");
const UserMessages = require("../Messages/User.messages")

const createHttpError = require("http-errors");
const { VerifyToken } = require("../Token/Jwt.token");
async function UserCheckLoginGuard(req, res, next) {
    try {
        if (!req.cookies.access_Token) throw new createHttpError.BadRequest(UserMessages.LoginFirst)
            const data = VerifyToken(req.cookies.access_Token);
            const user = await userModel.findOne({_id : data.id}, {createdAt : 0 , updatedAt : 0 , __v : 0, otpCode : 0});
            req.user = user;
            next();
    } catch (err) {
        next(err)
    }

}

module.exports = {
    UserCheckLoginGuard
}