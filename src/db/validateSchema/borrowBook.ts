import Joi from "joi";

export const insertSchema = Joi.object().keys({
    Member_ID: Joi.string().length(24).required(),
    Librarian_ID: Joi.string().length(24).required(),
    Borrow_Date: Joi.date().required()
})

export const updateSchema = Joi.object().keys({
    Member_ID: Joi.string().length(24).optional(),
    Librarian_ID: Joi.string().length(24).optional(),
    Borrow_Date: Joi.date().optional()
})

export const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};
