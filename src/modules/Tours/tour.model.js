const {Schema, model, Types} = require("mongoose");

const tourTimeSchema = new Schema({
    departingTime : {type : Date},
    arrivalTime : {type : Date}
}, {_id: 0})
const TourSchema = new Schema({
    tourName : {type : String , required : true, unique : true},
    capacity : {type : Number, required : true},
    price : {type : Number, required : true},
    tourID : {type : Number},
    tourLeader : {type : String, required : true},
    origin : {type : String, required : true},
    destination : {type : String, required : true},
    transportBy : {type : String, default : "اتوبوس", enum : ["اتوبوس", "قطار", "هواپیما"]},
    tourTime : {type : tourTimeSchema, required : true},
    insuranceType : {type : String, default : "بیمه 50 هزار دیناری"}

})


module.exports = model("tour", TourSchema);