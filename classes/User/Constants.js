

// generate schema validator using the joi  library
const Joi = require('joi');

// define the schema for the user model
const createSchema = Joi.object({
    name: Joi.string().required(),
    picture: Joi.string(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(10).regex(/^[0-9]+$/),
    roles: Joi.array().items(Joi.string().valid('USER', 'ADMIN', 'SUPER_ADMIN')).required(),
    isEmailVerified: Joi.boolean(),
});



const updateSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    picture: Joi.string(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(10).regex(/^[0-9]+$/),
    roles: Joi.array().items(Joi.string()),
    isEmailVerified: Joi.boolean(),

});

const deleteSchema = Joi.object({
    id: Joi.number().required(),
});



const name = "users"

const GetAttributes = ['id', 'name', 'picture', 'email', 'phone', 'roles', 'isEmailVerified'];

// export the schema
module.exports = {
    createSchema,
    GetAttributes,
    name,
    deleteSchema,
    updateSchema
}