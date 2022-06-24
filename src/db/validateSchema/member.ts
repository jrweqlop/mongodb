import Joi from "joi";

export const insertSchema = Joi.object().keys({
    Member_Student_ID:Joi.string().pattern(new RegExp(`^[0-9]{5,10}$`)).required(),
    Member_Name: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,30}$')).required(),
    Member_Add: Joi.string().required(),
    Member_Phone: Joi.string().length(10).required(),
    Member_Issue: Joi.date().required(),
    Member_Expiry: Joi.date().required(),
    Member_Category: Joi.string().required(),
})

export const updateSchema = Joi.object().keys({
    Member_Student_ID:Joi.string().pattern(new RegExp(`^[0-9]{5,10}$`)).optional(),
    Member_Name: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,30}$')).optional(),
    Member_Add: Joi.string().optional(),
    Member_Phone: Joi.string().length(10).optional(),
    Member_Issue: Joi.date().optional(),
    Member_Expiry: Joi.date().optional(),
    Member_Category: Joi.string().optional(),
})

export const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};
