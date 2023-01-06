const utils = require('../utils/utils');
const _ = require('lodash')
const Constants = require('../classes/Cart/Constants');
const Cart = require('../classes/Cart/Cart');


exports.Get = utils.asyncMiddleware(async (req, res, next) => {
    let query = _.pick(req.query, [...Constants.GetAttributes, ...['page', 'size']]);
    try {
        let response = await Cart.Get(query);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.Create = utils.asyncMiddleware(async (req, res, next) => {
    let data = _.pick(req.body, Constants.GetAttributes);
    try {
        let response = await Cart.Create(data);
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

        let response = await Cart.Update(req.body);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.Delete = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let response = await Cart.Delete(id);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
});

exports.GetById = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let response = await Cart.Get({ id: id });
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
});

