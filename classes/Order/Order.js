const utils = require('../../utils/utils');
const _ = require('lodash')
const models = require('../../models');

const { Op } = require("sequelize");
const Constants = require('./Constants');

const Get = async (query) => {
    let includeTables = [
        {
            model: models.users,
            as: 'user',
        },
        {
            model: models.carts,
            as: 'cart',
            include: [
                {
                    model: models.cartItems,
                    as: 'cartItems',
                    include: [
                        {
                            model: models.items,
                            as: 'item',
                        }
                    ]
                }]
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
    let order = await models[Constants.name].create(
        data
    );

    if (order) {
        return utils.classResponse(true, order, '');
    }
}

const Update = async (data) => {
    const { error } = Constants.updateSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let order = await models[Constants.name].update(data, {
        where: {
            id: data.id
        }
    });
    if (order) {
        return utils.classResponse(true, order, '');
    }
}

const Delete = async (id) => {
    const { error } = Constants.deleteSchema.validate(data);
    if (error) {
        return utils.classResponse(false, null, error.details[0].message);
    }
    let order = await models[Constants.name].destroy({
        where: {
            id: id
        }
    });
    if (order) {
        return utils.classResponse(true, order, '');
    }
}



module.exports = {
    Get,
    Create,
    Update,
    Delete
}
