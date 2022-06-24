import Joi from "joi";

export const insertSchema = Joi.object().keys({
    Borrow_ID: Joi.string().length(24).required(),
    Book_ID: Joi.string().length(24).required(),
})

export const updateSchema = Joi.object().keys({
    Borrow_ID: Joi.string().length(24).required(),
    Book_ID: Joi.string().length(24).required(),
})

export const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};
