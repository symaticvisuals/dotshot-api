

// generate schema validator using the joi  library
const Joi = require('joi');

// define the schema for the user model
const createSchema = Joi.object({
    name: Joi.string().required(),
});

const updateSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
});

const deleteSchema = Joi.object({
    id: Joi.number().required(),
});



const name = "categories"

const GetAttributes = ['id', 'name'];

// export the schema
module.exports = {
    createSchema,
    GetAttributes,
    name,
    updateSchema,
    deleteSchema
}