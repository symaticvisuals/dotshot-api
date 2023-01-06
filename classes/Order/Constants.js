

// generate schema validator using the joi  library
const Joi = require('joi');

// define the schema for the user model
const createSchema = Joi.object({
    addressId: Joi.number().required(),
    userId: Joi.number().required(),
    couponId: Joi.number(),
    cartId: Joi.number().required(),
    deliveryCharge: Joi.number().required(),
    total: Joi.number().required(),
    tax: Joi.number().required(),
});

const updateSchema = Joi.object({
    id: Joi.number().required(),
    addressId: Joi.number(),
    userId: Joi.number(),
    couponId: Joi.number(),
    cartId: Joi.number(),
    deliveryCharge: Joi.number(),
    total: Joi.number(),
    tax: Joi.number(),
    orderStatus: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'partially delivered', 'partially cancelled', 'partially shipped', 'partially processed', 'partially pending'),
});

const deleteSchema = Joi.object({
    id: Joi.number().required(),
});

const allowedStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'partially delivered', 'partially cancelled', 'partially shipped', 'partially processed', 'partially pending'];


const name = "orders"

const GetAttributes = ['id', 'addressId', 'userId', 'couponId', 'cartId', 'deliveryCharge', 'total', 'tax'];

// export the schema
module.exports = {
    createSchema,
    GetAttributes,
    name,
    updateSchema,
    deleteSchema,
    allowedStatuses
}