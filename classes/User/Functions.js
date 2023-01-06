const models = require('../../models');
const utils = require('../../utils/utils');
const _ = require('lodash')
const Constants = require('./Constants');

const getUserByEmail = async (email) => {
    let user = await models[Constants.name].findOne({
        where: {
            email: email
        }
    });
    console.log(user);
    if (user) {
        return utils.classResponse(true, user, '');
    }
    return utils.classResponse(false, null, 'User not found');
}

module.exports = {
    getUserByEmail
}
