const {userModel} = require("../../modules/Users/user.model");
const AuthMessages = require("../Messages/Auth.messages");
const { VerifyToken } = require("../Token/Jwt.token");

async function AuthLoginGuard(req,res,next) {
    try {
        const {access_Token} = req.cookies;
        if(!access_Token) return next();
        const data = VerifyToken(access_Token);
        const user =await userModel.findById(data.id).lean();
        if(!user) return next();
        return res.status(200).send({
            message : AuthMessages.alreadyLoggedIn,
            statusCode : res.statusCode
        })        
    } catch (err) {
        next(err)
    }
}

module.exports=  {
    AuthLoginGuard
}