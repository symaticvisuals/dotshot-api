

// generate schema validator using the joi  library
const Joi = require('joi');

// define the schema for the user model
const createSchema = Joi.object({
    cartId: Joi.number().required(),
    itemId: Joi.number().required(),
    quantity: Joi.number().required(),
    sellingPrice: Joi.number().required(),
    orderId: Joi.number().allow(null),
    sellerId: Joi.number().required(),
});

const updateSchema = Joi.object({
    id: Joi.number().required(),
    cartId: Joi.number(),
    itemId: Joi.number(),
    quantity: Joi.number(),
    sellingPrice: Joi.number(),
    orderId: Joi.number().allow(null),
    sellerId: Joi.number(),
    status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled')
});

const deleteSchema = Joi.object({
    id: Joi.number().required(),
});

const bulkCreateSchema = Joi.array().items(createSchema);



const name = "cartItems"

const GetAttributes = ['id', 'cartId', 'itemId', 'quantity', 'sellingPrice', 'orderId', 'sellerId', 'status', 'createdAt', 'updatedAt', 'deletedAt'];

// export the schema
module.exports = {
    createSchema,
    GetAttributes,
    name,
    updateSchema,
    deleteSchema,
    bulkCreateSchema
}