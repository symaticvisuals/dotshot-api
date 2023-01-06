

// generate schema validator using the joi  library
const Joi = require('joi');

// define the schema for the user model
const createSchema = Joi.object({
    userId: Joi.number().required(),
    subtotal: Joi.number().required(),
});

const updateSchema = Joi.object({
    id: Joi.number().required(),
    subtotal: Joi.number().required(),
});

const deleteSchema = Joi.object({
    id: Joi.number().required(),
});



const name = "carts"

const GetAttributes = ['id', 'userId', 'subtotal'];

// export the schema
module.exports = {
    createSchema,
    GetAttributes,
    name,
    updateSchema,
    deleteSchema
}