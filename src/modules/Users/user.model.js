const {Schema, model, Types} = require("mongoose");

const CreditSchema = new Schema ({
    creditNumber : {type : String},
    shabaNumber : {type : String},
    accountNumber : {type : String},

})

const TransactionSchema = new Schema({
    price : {type : String},
    Name : {type : String },
    orderID : {type : String},
    userID : {type : Types.ObjectId, ref : "user"}
}, {timestamps : true});


const UserSchema = new Schema({
    number : {type : String, required : true , unique : true},
    otpCode : {
        code : {type : String},
        expiresIn : {type : Number, default : 0}
    },
    email : {type : String },
    firstname : {type : String},
    lastname : {type : String},
    nationalCode : {type : String},
    gender : {type : String, enum : ["male", "female"]},
    birthday : {type : Date},
    myTours : {type : [Types.ObjectId], ref : "tours"},
    creditsInfo : {type : [CreditSchema]},
    transaction : {type : [Types.ObjectId], ref : "transaction"},
    walletValue : {type : Number, default : 0},
    IsVerified : {type : Boolean, default : false}

},{timestamps : true})


module.exports = {
    userModel : model("user",UserSchema),
    transactionModel : model('transaction', TransactionSchema)
};
