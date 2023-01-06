

// generate schema validator using the joi  library
const Joi = require('joi');

// define the schema for the user model
const createSchema = Joi.object({
    redeemedCouponId: Joi.number().required(),
    orderId: Joi.number().required(),
    userId: Joi.number().required(),
});

const updateSchema = Joi.object({
    id: Joi.number().required(),
    redeemedCouponId: Joi.number(),
    orderId: Joi.number(),
    userId: Joi.number(),
});

const deleteSchema = Joi.object({
    id: Joi.number().required(),
});



const name = "redeeemedCoupons"

const GetAttributes = ['id', 'redeemedCouponId', 'orderId', 'userId'];

// export the schema
module.exports = {
    createSchema,
    GetAttributes,
    name,
    updateSchema,
    deleteSchema
}