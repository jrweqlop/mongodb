import Joi from "joi";

export const insertSchema = Joi.object().keys({
    Book_Name:  Joi.string().max(30).required(),
    Book_Category:  Joi.string().max(30).required(),
    Book_Publishing: Joi.string().required(),
})

export const updateSchema = Joi.object().keys({
    Book_Name: Joi.string().max(30).optional(),
    Book_Category: Joi.string().max(20).optional(),
    Book_Publishing: Joi.string().optional(),
})

export const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};
