const moment = require("moment");
const { v1: uuidv1 } = require("uuid");
const fs = require("fs");
const serverConfig = require("../config/config").parameters.server;
const _ = require("lodash");

const rp = require("request-promise");
const OTPValidity = 300;

const Error = require("../errorConstants");
const req = require("./req");

const axios = require("axios");
const i18n = require("i18n");
i18n.configure({
  debug: true,
  locales: ["en", "es"],
  defaultLocale: "en",
  directory: "./locales",
});

/**
 * Async middleware to use await and async calls in express middleware ( For Controllers )
 * @param {*} fn Function
 * @returns
 */
const asyncMiddleware = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Send response back to the user
 * @param {*} req Request that came
 * @param {*} res Response to be sent
 * @param {*} success  If the request was a success or not
 * @param {*} data Any Data to be return
 * @param {*} err Error if any in the data
 */
const sendResponse = (req, res, success, data, err) => {
  return res.json({
    success,
    data,
    error: err,
  });
};

/**
 * Default response from any function to be sent back so that it is known if the function ran successfully
 * And if it did then what was the data that was there
 * @param {Boolean} success
 * @param {*} data
 * @param {*} err
 * @returns
 */
const classResponse = (success, data, err) => {
  return {
    success,
    data,
    err,
  };
};

/**
 * Make request using Request promise module
 *
 * @param {String} url URL of the request
 * @param {String} method Method of the request to be made GET,POST,PUT etc
 * @param {Object} headers Headers of the request to be sent
 * @param {Object} body Body containing
 *
 * @returns {Promise<{success: boolean, data: {}, error: string}>}
 */
const makeAxiosRequest = async (
  url,
  method,
  headers = {},
  body = "",
  auth = ""
) => {
  let response = {
    success: true,
    data: {},
    err: "",
  };

  let params = {
    url: url,
    method: method,
    headers: headers,
    data: body,
    json: true,
  };
  if (auth != "") {
    params.auth = auth;
  }

  try {
    let axiosResponse = await axios(params);
    response.data = axiosResponse.data;
  } catch (err) {
    let axiosError = err.response;
    response.success = false;
    response.err = axiosError;
  }

  return response;
};

/**
 * Get Pagination from a query
 * @param {*} query
 * @returns
 */
const getPagination = (query) => {
  if (query.hasOwnProperty("page") && query.hasOwnProperty("size")) {
    return {
      page: query.page,
      size: query.size,
    };
  }
  return {
    page: 1,
    size: 5,
  };
};

/**
 * Safely parse the data
 *
 * @param data
 * @returns {any}
 */
const parseSafe = (data) => {
  return JSON.parse(JSON.stringify(data));
};

/**
 * Get date in the standard format used across the app
 * @param {*} date
 * @param {*} timeOffSet
 * @returns
 */
const getFormattedDate = (date, timeOffSet = "+05:30", format = "LLL") => {
  return moment(date).utcOffset(timeOffSet).format(format);
};

/**
 * Safely parse the data
 *
 * @param data
 * @returns {any}
 */
const parseJSON = (data) => {
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

const errorHandler = async (err, req, res, next) => {
  try {
    console.log("Error in errorHandler: ", req.url, req.body, err);
    let response = {
      success: false,
      data: {},
      error: err || "Something went wrong",
    };
    res.send(response);
  } catch (err) {
    next(err);
  }
};

/**
 *
 *
 * @param url
 * @param method
 * @param body
 * @returns {Promise<{success: boolean, data: {}, error: string}>}
 */
const makeRequest = async (url, method, body) => {
  let response = {
    success: true,
    data: {},
    error: "",
  };

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  let params = {
    url: url,
    method: method,
    headers: headers,
    body: body,
    json: true,
  };

  try {
    response.data = await rp(params);
  } catch (err) {
    response.success = false;
    response.error = err;
  }
  return response;
};

/////////////////// ENVIRONMENT VARIABLE FUNCTIONS ///////////////////
const isLocalEnvironment = () => {
  return serverConfig.node_env === "local";
};

const isProdEnvironment = () => {
  return serverConfig.node_env === "production";
};

const isDevEnvironment = () => {
  return serverConfig.node_env === "development";
};

module.exports = {
  isDevEnvironment,
  isLocalEnvironment,
  isProdEnvironment,
  asyncMiddleware,
  makeAxiosRequest,
  parseJSON,
  getFormattedDate,
  getPagination,
  errorHandler,
  parseSafe,
  classResponse,
  sendResponse,
  makeRequest,
};
