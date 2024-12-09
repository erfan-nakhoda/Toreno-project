const Joi = require("joi");
const moment = require('jalali-moment');

const TourCreateValidationSchema = Joi.object({
    tourName: Joi.string().required().min(3),
    capacity: Joi.number().min(1).required(),
    price : Joi.number().required(),
    tourLeader: Joi.string().required(),
    origin: Joi.string().required(),
    destination: Joi.string().required(),
    transportBy: Joi.string().valid("اتوبوس", "هواپیما", "قطار").required(),
    departingTime: Joi.string().required().custom((value, helper) => {
        const now = moment().startOf("day");
        
        const enteredDate = moment(value, "jYYYY-jMM-jDD", true);

        if (!enteredDate.isValid()) return helper.message(".تاریخ وارد شده اشتباه است")
        if (!enteredDate.isSameOrAfter(now)) return helper.message(".تاریخ وارد شده امکان پذیر نیست لطفا دوباره وارد کنید");
        return enteredDate.utc().startOf("day").toISOString(false);

    }),
    arrivalTime: Joi.string().required().custom((value, helper) => {
        const departingTime = moment(helper.state.ancestors[0].departingTime);
        const enteredDate = moment(value, "jYYYY-jMM-jDD", true);

        if (!enteredDate.isValid() || !departingTime.isValid()) return helper.message(".تاریخ وارد شده اشتباه است");
        if (!enteredDate.isAfter(departingTime)) return helper.message("..تاریخ وارد شده امکان پذیر نیست لطفا دوباره وارد کنید");
        return enteredDate.utc().startOf("day").toISOString(false);
    }),
    insuranceType: Joi.string()
})
async function TourCreateValidation(data) {
    const result = await TourCreateValidationSchema.validateAsync(data);
    return result;
}

const TourUpdateValidationSchema = TourCreateValidationSchema.fork((Object.keys(TourCreateValidationSchema.describe().keys)), (schema) => schema.optional());
async function TourUpdateValidation(data) {
    const result = await TourUpdateValidationSchema.validateAsync(data);
    return result;
}

const TourPassengerInfoSchema = Joi.object({
    fullname : Joi.string().required(),
    nationalCode : Joi.string().required(),
    birthDate : Joi.string().custom((value, helper) => {
        if(!moment(value, "jYYYY-jMM-jDD").isValid()) return helper.message(".لطفا تاریخ تولد خود را به درستی وارد کنید")
    }),
    gender : Joi.string().valid("مرد", "زن")
})
async function TourPassengerInfoValidation(data) {
    const result = await TourPassengerInfoSchema.validateAsync(data);
    return result;
}

const TourFilterValidationSchema = Joi.object({
    origin : Joi.string(),
    destination : Joi.string(),
    departingTime : Joi.string().custom((value,helper) =>{
        if(!moment(value, "jYYYY-jMM-jDD").isValid()) return helper.message(".تاریخ وارد شده معتبر نیست");
        console.log(moment().startOf("day"));
        
        return moment(value, "jYYYY-jMM-jDD").utc().startOf('day').toISOString(false)
    })
})

async function TourFilterValidation(body) {
    const result = await TourFilterValidationSchema.validateAsync(body);
    return result

}
module.exports = { TourFilterValidation,TourCreateValidation, TourUpdateValidation, TourPassengerInfoValidation}