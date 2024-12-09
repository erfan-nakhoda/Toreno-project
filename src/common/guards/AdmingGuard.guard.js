const createHttpError = require("http-errors");
const UserMessages = require("../Messages/User.messages");
const { VerifyToken } = require("../Token/Jwt.token");
const { userModel } = require("../../modules/Users/user.model");

module.exports =  AdminCheckGuard = async (req,res,next) => {
    try {
        if (!req.cookies.access_Token) throw new createHttpError.BadRequest(UserMessages.LoginFirst);
            const data = VerifyToken(req.cookies.access_Token);
            const admin = await userModel.findById(data.id, {createdAt : 0 , updatedAt : 0 , __v : 0, otpCode : 0});
            
            if(admin.role != "admin" || !admin.role) throw new createHttpError("401",UserMessages.AccessDenied);
            req.user = admin;
            next();
    } catch (err) {
        next(err)
    }
}