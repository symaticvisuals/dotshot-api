const utils = require('../../utils/utils');
const _ = require('lodash')
const models = require('../../models');

const { Op } = require("sequelize");
const Constants = require('./Constants');

const Get = async (query, includeTables = []) => {
    includeTables = [
        {
            model: models.categories,
            as: 'category',
        }
    ]
    let response = await models[Constants.name].findAll({
        where: query,
        include: includeTables
    }, includeTables);

    return utils.classResponse(true, response, '');
}

const Create = async (data) => {
    const { error } = Constants.createSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }

    console.log("data", data);
    let item = await models[Constants.name].create(data);

    if (item) {
        return utils.classResponse(true, item, '');
    }
}

const Update = async (data) => {
    const { error } = Constants.updateSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let item = await models[Constants.name].update(data, {
        where: {
            id: data.id
        }
    });
    if (item) {
        return utils.classResponse(true, item, '');
    }
}

const Delete = async (data) => {
    const { error } = Constants.deleteSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let item = await models[Constants.name].destroy({
        where: {
            id: data.id
        }
    });
    if (item) {
        return utils.classResponse(true, item, '');
    }
}


module.exports = {
    Get,
    Create,
    Update,
    Delete
}
