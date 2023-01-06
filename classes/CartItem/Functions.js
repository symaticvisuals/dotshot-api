const utils = require('../../utils/utils');
const _ = require('lodash')
const models = require('../../models');

const { Op } = require("sequelize");
const Constants = require('./Constants');

const getItemsBySellerId = async (sellerId) => {
    let response = await models[Constants.name].findAll({
        where: {
            sellerId: sellerId
        }
    });

    return utils.classResponse(true, response, '');
}


module.exports = {
    getItemsBySellerId,

}
