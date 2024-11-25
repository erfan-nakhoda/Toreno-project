const jwt = require("jsonwebtoken")
require('dotenv').config();

const TokenMaker = (payload) => {
    if(payload){
    const Token = jwt.sign(payload, process.env.JWT_SERECTKEY)
    return Token
}
throw new Error("somthing went wrong")
}

const VerifyToken = (Token) => {
    const verifiedToken = jwt.verify(Token, process.env.JWT_SERECTKEY);
    if(! verifiedToken) throw new Error("Token is not valid");
    return verifiedToken;
}

module.exports = {
    TokenMaker,
    VerifyToken
}