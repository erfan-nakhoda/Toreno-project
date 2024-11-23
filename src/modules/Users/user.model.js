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
    email : {type : String },
    firstname : {type : String},
    lastname : {type : String},
    nationalCode : {type : String},
    birthday : {type : Date},
    creditsInfo : [CreditSchema],
    transaction : [TransactionSchema]

})

module.exports = model("user",UserSchema);
