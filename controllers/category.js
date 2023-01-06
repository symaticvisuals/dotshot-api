const utils = require('../utils/utils');
const _ = require('lodash')
const Constants = require('../classes/Category/Constants');
const Category = require('../classes/Category/Category');

exports.Get = utils.asyncMiddleware(async (req, res, next) => {
    let query = _.pick(req.query, [...Constants.GetAttributes, ...['page', 'size']]);
    try {
        let response = await Category.Get(query);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.Create = utils.asyncMiddleware(async (req, res, next) => {
    let data = _.pick(req.body, Constants.GetAttributes);
    try {
        let response = await Category.Create(data);
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

        let response = await Category.Update(req.body);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.Delete = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let response = await Category.Delete(id);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
});

exports.GetById = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let response = await Category.Get({ id: id });
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
});     