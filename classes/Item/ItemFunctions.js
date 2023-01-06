const utils = require('../../utils/utils')
const _ = require('lodash');
const Constants = require('../../classes/Item/Constants');
const models = require('../../models');
const { Op } = require('sequelize');

const getItemsByIds = async (ids) => {
    let response = await models[Constants.name].findAll({
        where: {
            id: {
                [Op.in]: ids,
            },
        },
        include: [
            {
                model: models.categories,
                as: 'category',
            },
        ],
    });
    return utils.classResponse(true, response, '');
}

module.exports = {
    getItemsByIds,
};


