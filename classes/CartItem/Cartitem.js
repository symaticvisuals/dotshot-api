const utils = require('../../utils/utils');
const _ = require('lodash')
const models = require('../../models');

const { Op } = require("sequelize");
const Constants = require('./Constants');

const Get = async (query) => {
    let includeTables = [
        {
            model: models.items,
            as: 'item',
        },
    ];
    let response = await models[Constants.name].findAll({
        where: query,
        include: includeTables
    });

    return utils.classResponse(true, response, '');
}

const Create = async (data) => {
    const { error } = Constants.createSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let cartItem = await models[Constants.name].create(
        data
    );

    if (cartItem) {
        return utils.classResponse(true, cartItem, '');
    }
}

const BulkCreate = async (data) => {
    const { error } = Constants.bulkCreateSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let cartItems = await models[Constants.name].bulkCreate(data);
    if (cartItems) {
        return utils.classResponse(true, cartItems, '');
    }
}



const Update = async (data) => {
    const { error } = Constants.updateSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let cartItem = await models[Constants.name].update(data, {
        where: {
            id: data.id
        }
    });
    if (cartItem) {
        return utils.classResponse(true, cartItem, '');
    }
}

const Delete = async (id) => {
    const { error } = Constants.deleteSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let cartItem = await models[Constants.name].destroy({
        where: {
            id: id
        }
    });
    if (cartItem) {
        return utils.classResponse(true, cartItem, '');
    }
}


module.exports = {
    Get,
    Create,
    Update,
    Delete,
    BulkCreate
}
