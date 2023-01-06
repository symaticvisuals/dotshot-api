const utils = require('../utils/utils');
const _ = require('lodash');
const Constants = require('../classes/CartItem/Constants');
const CartItem = require('../classes/CartItem/CartItem');
// const CartItemFunctions = require('../classes/CartItem/Functions');
exports.Get = utils.asyncMiddleware(async (req, res, next) => {
    let query = _.pick(req.query, [...Constants.GetAttributes, ...['page', 'size']]);
    try {
        let response = await CartItem.Get(query);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.Create = utils.asyncMiddleware(async (req, res, next) => {
    let data = _.pick(req.body, Constants.GetAttributes);
    try {
        let response = await CartItem.Create(data);
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

        let response = await CartItem.Update(req.body);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.Delete = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let response = await CartItem.Delete(id);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.BulkCreate = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let data = req.body;
        let responseData = [];
        let response = await Promise.all(data.map(async (item) => {
            let itemResponse = await CartItem.Create(item);
            responseData.push(itemResponse);
            return itemResponse;
        }));

        let createSuccess = response.filter(item => item.success).length == response.length;
        let createData = responseData.map(item => item.data);
        return utils.sendResponse(req, res, createSuccess, createData, '');
    }
    catch (err) {
        next(err);
    }
})

exports.getBySellerId = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let response = await CartItem.Get({ sellerId: id });
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.updateCartItemStatus = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let status = req.body.status;
        console.log(id, status);
        let response = await CartItem.Update({ id: id, status: status });
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})