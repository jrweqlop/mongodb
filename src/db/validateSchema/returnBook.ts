import Joi from "joi";

export const insertSchema = Joi.object().keys({
    Return_Date: Joi.date().required(),
    BorrowDetail_ID: Joi.string().length(24).required(),
    Member_ID: Joi.string().length(24).required(),
    Librarian_ID:Joi.string().length(24).required()
})

export const updateSchema = Joi.object().keys({
    Return_Date: Joi.date().optional(),
    BorrowDetail_ID: Joi.string().length(24).optional(),
    Member_ID: Joi.string().length(24).optional(),
    Librarian_ID:Joi.string().length(24).optional()
})

export const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};
