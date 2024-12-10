const Joi = require("joi");
const { isValidObjectId } = require("mongoose");
const moment = require('jalali-moment');

const filterTransactionsValidateSchema = Joi.object({
    Name : Joi.string(),
    userID : Joi.string().custom((value,helper) => {
        if(!isValidObjectId(value)) return helper.message(".شناسه وارد شده نامعتبر است")
        return value;
    }),
    orderID : Joi.number(),
    date : Joi.string().custom((value,helper) => {
        const date = moment(value,"jYYYY-jMM-jDD")
        if(!date.isValid()) return helper.message(".تاریخ وارد شده معتبر نمی باشد")
        return date.utc().startOf('day').add(1,"day").toISOString();
    })
});
const filterUsersValidateSchema = Joi.object({
    number : Joi.string(),
    email : Joi.string().email(),
    firstname : Joi.string(),
    lastname : Joi.string(),
    nationalCode : Joi.number()
});

async function filterTransactionValidation(body) {
    const value = await filterTransactionsValidateSchema.validateAsync(body);
    return value
}

async function filterUserValidation(body) {
    const value = await filterUsersValidateSchema.validateAsync(body);
    return value;
}

module.exports = {
    filterTransactionValidation,
    filterUserValidation
}