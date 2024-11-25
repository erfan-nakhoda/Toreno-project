const jwt = require("jsonwebtoken")

const TokenMaker = (payload) => {
    if(payload){
    const Token = jwt.sign(payload, process.env.JWT_SERECTKEY)
    return Token
}
throw new Error("somthing went wrong")
}

const VerifyToken = (Token) => {
    const Token = jwt.verify(Token, process.env.JWT_SERECTKEY);
    if(! Token) throw new Error("Token is not valid");
    return Token
}

module.exports = {
    TokenMaker,
    VerifyToken
}