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
    const { error } = Constants.createSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let address = await models[Constants.name].create(
        data
    );

    if (address) {
        return utils.classResponse(true, address, '');
    }
}

const Update = async (data) => {
    const { error } = Constants.updateSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let address = await models[Constants.name].update(data, {
        where: {
            id: data.id
        }
    });
    if (address) {
        return utils.classResponse(true, address, '');
    }
}

const Delete = async (id) => {
    const { error } = Constants.deleteSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let address = await models[Constants.name].destroy({
        where: {
            id: id
        }
    });
    if (address) {
        return utils.classResponse(true, address, '');
    }
}


module.exports = {
    Get,
    Create,
    Update,
    Delete
}
