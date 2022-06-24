import Joi from "joi";

export const insertSchema = Joi.object().keys({
    Librarian_Name: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,30}$')).required(),
    Librarian_Phone: Joi.string().length(10).required(),
    Librarian_Issue: Joi.date().required(),
    Librarian_Expiry: Joi.date().required()
})

export const updateSchema = Joi.object().keys({
    Librarian_Name: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,30}$')).optional(),
    Librarian_Phone: Joi.string().length(10).optional(),
    Librarian_Issue: Joi.date().optional(),
    Librarian_Expiry: Joi.date().optional()
})

export const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};
