const {Schema, model} = require("mongoose");

const CreditSchema = new Schema ({
    creditNumber : {type : String},
    shabaNumber : {type : String},
    accountNumber : {type : String}
})

const TransactionSchema = new Schema({
    price : {type : String},
    tourName : {type : String , ref : "tours"},
    orderID : {type : String}
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
    birthday : {type : Date},
    creditsInfo : {type : [CreditSchema]},
    transaction : {type : [TransactionSchema]},
    IsVerified : {type : Boolean, default : false}

})

module.exports = model("user",UserSchema);
