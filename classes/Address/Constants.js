

// generate schema validator using the joi  library
const Joi = require('joi');

// define the schema for the user model
const createSchema = Joi.object({
    name: Joi.string().required(),
    userId: Joi.number().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
});

const updateSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string(),
    userId: Joi.number(),
    city: Joi.string(),
    state: Joi.string(),
    pincode: Joi.string(),

});

const deleteSchema = Joi.object({
    id: Joi.number().required(),
});



const name = "addresses"

const GetAttributes = ['id', 'name', 'userId', 'city', 'state', 'pincode'];

// export the schema
module.exports = {
    createSchema,
    GetAttributes,
    name,
    deleteSchema,
    updateSchema
}