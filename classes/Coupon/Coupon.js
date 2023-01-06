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
    let coupon = await models[Constants.name].findOrCreate({
        where: {
            // check if the code is not already created
            code: data.code
        },
        defaults: data
    });

    if (coupon) {
        return utils.classResponse(true, coupon, '');
    }
}

const Update = async (data) => {
    const { error } = Constants.updateSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let user = await models[Constants.name].update(data, {
        where: {
            id: data.id
        }
    });
    if (user) {
        return utils.classResponse(true, user, '');
    }
}

const Delete = async (id) => {
    const { error } = Constants.deleteSchema.validate({ id });
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let user = await models[Constants.name].destroy({
        where: {
            id: id
        }
    });
    if (user) {
        return utils.classResponse(true, user, '');
    }
}



module.exports = {
    Get,
    Create,
    Update,
    Delete
}
