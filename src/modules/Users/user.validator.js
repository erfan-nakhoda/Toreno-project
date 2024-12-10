const moment = require("jalali-moment");
const Joi = require("joi");

const UpdateJoiSchema = Joi.object({
    firstname : Joi.string().min(3).max(20),
    lastname : Joi.string().min(3).max(25),
    email : Joi.string().email().message(".ایمیل وارد شده اشتباه است"),
    nationalCode : Joi.number().min(11),
    gender : Joi.string().valid("زن", "مرد"),
    birthDate : Joi.string().custom((value, helper) => {
        if(!moment(value, "jYYYY-jMM-jDD").isValid()) return helper.message(".تاریخ وارد شده معتبر نیست");
        return moment(value,"jYYYY-jMM-jDD").utc().startOf("day").add(1,"day").toISOString();
    })
})

const UpdateCreditSchema = Joi.object({
    creditNumber : Joi.string().pattern(/^[0-9]{16}$/).rule({message : ".شماره کارت باید 16 رقم باشد"}),
    shabaNumber : Joi.string().pattern(/^IR[0-9]{24}$/).message(".شماره شبا ی وارد شده معتبر نیست"),
    accountNumber : Joi.string(),
})

async function UpdateValidation(body) {
    const value = await UpdateJoiSchema.validateAsync(body);
    return value;
}
async function UpdateCreditValidation(body) {
    const value = await UpdateCreditSchema.validateAsync(body);
    return value
}
module.exports = {UpdateCreditValidation,UpdateValidation};