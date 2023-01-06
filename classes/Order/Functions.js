const utils = require('../../utils/utils');
const _ = require('lodash')
const models = require('../../models');

const { Op } = require("sequelize");
const Constants = require('./Constants');

const checkUserClaimedCoupon = async (userId, couponId) => {
    let coupon = await models[Constants.name].findOne({
        where: {
            [Op.and]: [
                { userId: userId },
                { couponId: couponId }
            ]
        }
    });
    if (coupon) {
        return true;
    }
    return false;
}

module.exports = {
    checkUserClaimedCoupon
}