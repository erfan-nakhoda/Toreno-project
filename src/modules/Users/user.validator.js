const createHttpError = require("http-errors");
const moment = require("jalali-moment");
const Joi = require("joi");
const UserMessages = require("../../common/Messages/User.messages");

const UpdateJoiSchema = Joi.object({
    firstname : Joi.string().min(3).max(20),
    lastname : Joi.string().min(3).max(25),
    email : Joi.string().email(),
    nationalCode : Joi.number().min(11),
    gender : Joi.string().valid("زن", "مرد"),
    birthday : Joi.string().custom((value, helper) => {
        if(!moment(value, "jYYYY-jMM-jDD").isValid()) return helper.message(".تاریخ وارد شده معتبر نیست");
        return moment(value,"jYYYY-jMM-jDD").locale("en").startOf("day").toDate();
    })
})

const UpdateCreditSchema = Joi.object({
    creditNumber : Joi.string().pattern(/^[0-9]{16}$/).rule({message : ".شماره کارت باید 16 رقم باشد"}),
    shabaNumber : Joi.string().pattern(/^IR[0-9]{24}$/),
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