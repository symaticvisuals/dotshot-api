const utils = require('../utils/utils');
const _ = require('lodash')
const Constants = require('../classes/User/Constants');
const User = require('../classes/User/User');
const UserFunctions = require('../classes/User/Functions');
exports.Get = utils.asyncMiddleware(async (req, res, next) => {
    let query = _.pick(req.query, [...Constants.GetAttributes, ...['page', 'size']]);
    try {
        let response = await User.Get(query);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.Create = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let data = _.pick(req.user, Constants.GetAttributes);
        data.roles = req.body.roles;
        response = await User.Create(data);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.Login = utils.asyncMiddleware(async (req, res, next) => {
    console.log('Login');
    try {
        let data = _.pick(req.user, Constants.GetAttributes);
        let response = await UserFunctions.getUserByEmail(data.email);
        if (!response.success && response.data === null) {
            let newUserResponse = {
                success: true,
                data: {
                    newUser: true,
                    user: {
                        ...req.user,
                    },
                },
                err: ''
            }
            return utils.sendResponse(req, res, newUserResponse.success, newUserResponse.data, newUserResponse.err);
        }
        if (response.err) {
            return utils.sendResponse(req, res, response.success, response.data, 'Something Went Wrong');
        }
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    } catch (err) {
        next(err);
    }
})


exports.Update = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let data = req.body;
        if (!req.body.id && req.params.id)
            data.id = req.params.id;

        let response = await User.Update(req.body);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
})

exports.Delete = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let response = await User.Delete(id);
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
});

exports.GetById = utils.asyncMiddleware(async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let response = await User.Get({ id: id });
        return utils.sendResponse(req, res, response.success, response.data, response.err);
    }
    catch (err) {
        next(err);
    }
});     