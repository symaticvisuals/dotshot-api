

// generate schema validator using the joi  library
const Joi = require('joi');

// define the schema for the user model
const createSchema = Joi.object({
    code: Joi.string().required(),
    discount: Joi.number().required(),
    validFrom: Joi.date().required(),
    validTo: Joi.date().required(),
    minPurchase: Joi.number().required(),
});

const updateSchema = Joi.object({
    id: Joi.number().required(),
    code: Joi.string(),
    discount: Joi.number(),
    validFrom: Joi.date(),
    validTo: Joi.date(),
    minPurchase: Joi.number(),
});

const deleteSchema = Joi.object({
    id: Joi.number().required(),
});



const name = "coupons"

const GetAttributes = ['id', 'code', 'discount', 'validFrom', 'validTo', 'minPurchase'];

// export the schema
module.exports = {
    createSchema,
    GetAttributes,
    name,
    updateSchema,
    deleteSchema
}