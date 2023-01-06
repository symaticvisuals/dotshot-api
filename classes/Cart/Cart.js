const utils = require('../../utils/utils');
const _ = require('lodash')
const models = require('../../models');

const { Op } = require("sequelize");
const Constants = require('./Constants');

const Get = async (query) => {
    let response = await models[Constants.name].findAll({
        where: query,
    });

    return utils.classResponse(true, response, '');
}

const Create = async (data) => {
    console.log("HERE", data)
    const { error } = Constants.createSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let cart = await models[Constants.name].create(data);

    if (cart) {
        return utils.classResponse(true, cart, '');
    }
}

const Update = async (data) => {
    const { error } = Constants.updateSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let cart = await models[Constants.name].update(data, {
        where: {
            id: data.id
        }
    });
    if (cart) {
        return utils.classResponse(true, cart, '');
    }
}

const Delete = async (id) => {
    const { error } = Constants.deleteSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let cart = await models[Constants.name].destroy({
        where: {
            id: id
        }
    });
    if (cart) {
        return utils.classResponse(true, cart, '');
    }
}


module.exports = {
    Get,
    Create,
    Update,
    Delete
}
