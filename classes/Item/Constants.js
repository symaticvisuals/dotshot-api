

// generate schema validator using the joi  library
const Joi = require('joi');

// define the schema for the user model
const createSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    image: Joi.string(),
    categoryId: Joi.number().required(),
    sellerId: Joi.number().required(),
    rating: Joi.number(),
    isAvailable: Joi.boolean(),
    isFeatured: Joi.boolean(),
    isOutOfStock: Joi.boolean(),
    isLowStock: Joi.boolean(),
    isSoldOut: Joi.boolean(),
});

const updateSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    quantity: Joi.number(),
    image: Joi.string(),
    categoryId: Joi.number(),
    sellerId: Joi.number(),
    rating: Joi.number(),
    isAvailable: Joi.boolean(),
    isFeatured: Joi.boolean(),
    isOutOfStock: Joi.boolean(),
    isLowStock: Joi.boolean(),
    isSoldOut: Joi.boolean(),
});

const deleteSchema = Joi.object({
    id: Joi.number().required(),
});



const name = "items"

const GetAttributes = ['id', 'name', 'description', 'price', 'quantity', 'image', 'categoryId', 'sellerId', 'rating', 'isAvailable', 'isFeatured', 'isOutOfStock', 'isLowStock', 'isSoldOut'];

// export the schema
module.exports = {
    createSchema,
    GetAttributes,
    name,
    updateSchema,
    deleteSchema
}