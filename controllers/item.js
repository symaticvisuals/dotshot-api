const utils = require('../utils/utils');
const _ = require('lodash')
const Constants = require('../classes/Item/Constants');
const Item = require('../classes/Item/Item');
const ItemFunctions = require('../classes/Item/ItemFunctions');
exports.Get = utils.asyncMiddleware(async (req, res, next) => {
    let query = _.pick(req.query, [...Constants.GetAttributes, ...['page', 'size']]);
    try {
        let response = await Item.Get(query);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.Create = utils.asyncMiddleware(async (req, res, next) => {
    console.log(req.body);
    let data = _.pick(req.body, Constants.GetAttributes);
    try {
        let response = await Item.Create(data);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})


exports.Update = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let data = req.body;
        console.log("here", req.body);
        if (!req.body.id && req.params.id)
            data.id = req.params.id;

        let response = await Item.Update(data);

        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.Delete = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let response = await Item.Delete({ id });
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
});

exports.GetById = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let response = await Item.Get({ id: id });
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
});

exports.GetBySellerId = utils.asyncMiddleware(async (req, res, next) => {

    try {
        let id = parseInt(req.params.id);
        let response = await Item.Get({ sellerId: id });
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.GetByIds = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let ids = req.params.itemIds;
        let response = await ItemFunctions.getItemsByIds(ids);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
}
)