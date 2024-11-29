const Joi = require("joi");

const UpdateJoiSchema = Joi.object({
    firstname : Joi.string().min(3).max(20),
    lastname : Joi.string().min(3).max(25),
    email : Joi.string().email(),
    nationalCode : Joi.number().min(11),
    gender : Joi.string().valid("male", "female"),
    birthday : Joi.date()
})

async function UpdateValidation(body) {
    const value = await UpdateJoiSchema.validateAsync(body);
    return value;
}

module.exports = UpdateValidation;