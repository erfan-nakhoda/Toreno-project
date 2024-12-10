const { Schema, model, Types } = require("mongoose");

const CreditSchema = new Schema({
    // شماره کارت
    creditNumber: { type: String },
    // شماره شبا
    shabaNumber: { type: String },
    //شماره حساب
    accountNumber: { type: String },

}, {_id : 0})

const TransactionSchema = new Schema({
    price: { type: Number },
    Name: { type: String },
    orderID: { type: String },
    userID: { type: Types.ObjectId, ref: "user" }
}, { timestamps: true });

const myTourSectionSchema = new Schema({
    passengerInfo: {
        fullname: { type: String },
        nationalCode: { type: String },
        birthDate: { type: Date },
        gender: { type: String, enum: ["مرد", "زن"] }
    },
    tourInfo: { type: Types.ObjectId, ref: "tours" }
}, { _id: 0 })
const UserSchema = new Schema({
    number: { type: String, required: true, unique: true },
    otpCode: {
        code: { type: String },
        expiresIn: { type: Number, default: 0 }
    },
    personalInfo: {
        email: { type: String },
        firstname: { type: String },
        lastname: { type: String },
        nationalCode: { type: String },
        gender: { type: String, enum: ["مرد", "زن"] },
        birthDate: { type: Date }
    },
    myTours: { type: [myTourSectionSchema], required: true },
    creditsInfo: { type: CreditSchema },
    transaction: { type: [Types.ObjectId], ref: "transaction" },
    walletValue: { type: Number, default: 0 },
    IsVerified: { type: Boolean, default: false },
    role : {type : String, default : "user"}

}, { timestamps: true })

function autoPopulate(next) {
    this.populate('transaction',{__v : 0, createdAt : 0 , updatedAt : 0, userID : 0, _id : 0});
    // this.populate('myTours');
    next();
}

UserSchema.pre("find", autoPopulate);
UserSchema.pre('findOne', autoPopulate)
module.exports = {
    userModel: model("user", UserSchema),
    transactionModel: model('transaction', TransactionSchema)
};
