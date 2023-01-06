const utils = require('../utils/utils');
const _ = require('lodash')
const Constants = require('../classes/Coupon/Constants');
const Coupon = require('../classes/Coupon/Coupon');
const { Op } = require('sequelize');
const OrderFunctions = require('../classes/Order/Functions');

exports.Get = utils.asyncMiddleware(async (req, res, next) => {
    let query = _.pick(req.query, [...Constants.GetAttributes, ...['page', 'size']]);
    try {
        let response = await Coupon.Get(query);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.Create = utils.asyncMiddleware(async (req, res, next) => {
    let data = _.pick(req.body, Constants.GetAttributes);
    try {
        let response = await Coupon.Create(data);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})


exports.Update = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let data = req.body;
        if (!req.body.id && req.params.id)
            data.id = req.params.id;

        let response = await Coupon.Update(req.body);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.Delete = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let response = await Coupon.Delete(id);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
});

exports.GetById = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let response = await Coupon.Get({ id: id });
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
});

exports.GetByCode = async (req, res, next) => {
    try {

        let code = req.query.code;
        let userId = req.query.userId;
        let response = await Coupon.Get({ code: code });
        console.log(utils.parseSafe(response.data, 'id'));
        if (!response.success || !response.data || response.data.length == 0) {
            return utils.sendResponse(req, res, false, null, "Coupon not found");
        }
        let couponCheck = await OrderFunctions.checkUserClaimedCoupon(userId, response.data[0].id);
        if (couponCheck) {
            console.log("Coupon already claimed");
            return utils.sendResponse(req, res, false, null, "Coupon already claimed");
        }
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
}