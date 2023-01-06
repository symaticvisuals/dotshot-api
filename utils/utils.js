const moment = require('moment')
const { v1: uuidv1 } = require('uuid');
const fs = require("fs");
const serverConfig = require('../config/config').parameters.server;
const _ = require('lodash')




const rp = require('request-promise');
const OTPValidity = 300

const Error = require('../errorConstants');
const req = require('./req');

const axios = require('axios');
const i18n = require('i18n');
i18n.configure({
	debug: true,
	locales: ['en', 'es'],
	defaultLocale: 'en',
	directory: './locales'
});


/**
 * Async middleware to use await and async calls in express middleware ( For Controllers )
 * @param {*} fn Function
 * @returns
 */
const asyncMiddleware = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

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
		error: err
	});
}


/**
 * Check if data is empty
 *
 * @param data
 * @returns {boolean}
 */
const empty = (data) => {
	if (typeof (data) === 'number' || typeof (data) === 'boolean') {
		return false;
	}
	if (typeof (data) === 'undefined' || data === null) {
		return true;
	}
	if (typeof (data.length) !== 'undefined') {
		return data.length === 0;
	}
	for (let i in data) {
		if (data.hasOwnProperty(i)) {
			return false;
		}
	}
	return true;
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
		err
	}
}

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
const makeAxiosRequest = async (url, method, headers = {}, body = '', auth = '') => {
	let response = {
		success: true,
		data: {},
		err: ''
	};

	let params = {
		url: url,
		method: method,
		headers: headers,
		data: body,
		json: true
	};
	if (auth != "") {
		params.auth = auth;
	}

	try {
		let axiosResponse = await axios(params);
		response.data = axiosResponse.data;
	}
	catch (err) {
		let axiosError = err.response;
		response.success = false;
		response.err = axiosError;
	}

	return response
};

/**
 * Get Pagination from a query
 * @param {*} query
 * @returns
 */
const getPagination = (query) => {
	if (query.hasOwnProperty('page') && query.hasOwnProperty('size')) {
		return {
			page: query.page,
			size: query.size
		}
	}
	return {
		page: 1,
		size: 5
	}
}

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
	return moment(date).utcOffset(timeOffSet).format(format)
}

/**
 * Safely parse the data
 *
 * @param data
 * @returns {any}
 */
const parseJSON = (data) => {
	try {
		return JSON.parse(data)
	}
	catch (err) {
		return data
	}
};


/**
 * Generate OTP
 */
const generateOTP = async () => {
	return Math.floor(100000 + Math.random() * 900000);
};

const errorHandler = async (err, req, res, next) => {
	try {
		console.log("Error in errorHandler: ", req.url, req.body, err);
		let response = {
			success: false,
			data: {},
			error: err || 'Something went wrong'
		};
		res.send(response)
	}
	catch (err) {
		next(err)
	}
};

/**
 * Get Date int utc format in indian time
 *
 * @param {*} date
 * @param startOf
 * @param subtract
 * @param subtractUnit
 */
const setAsStartDateUTC = (date, startOf = 'day', subtract = 0, subtractUnit = 'day') => {
	if (startOf === 'week') {
		startOf = 'isoWeek'
	}
	return moment(date).subtract(subtract, subtractUnit).startOf(startOf).utc()
}

/**
 * Get Date int utc format in indian time
 *
 * @param {*} date
 * @param endOf
 * @param add
 * @param addUnit
 */
const setAsEndDateUTC = (date, endOf = 'day', add = 0, addUnit = 'day') => {
	if (endOf === 'week') {
		endOf = 'isoWeek'
	}
	return moment(date).add(add, addUnit).endOf(endOf).utc()
}

/**
 *
 * @param {*} days
 * @param {*} date in yyyy/mm/dd format
 * @returns
 */
function getDateXDaysAhead(days, date = new Date()) {
	let dateAhead = moment(date);
	return dateAhead.add(days, 'days').format('YYYY-MM-DD');
}

function getDaysBetweenDates(date1, date2) {
	return Math.ceil(Math.abs(date2 - date1) / (60 * 60 * 24 * 1000))
}

/**
 * Convert Sting To hexa
 *
 * @param {*} str
 * @returns
 */
const stringToHex = async (str) => {
	//converting string into buffer
	let bufStr = Buffer.from(str, 'utf8');

	//with buffer, you can convert it into hex with following code
	return bufStr.toString('hex');
}




/**
 * Sleep the process for milliseconds
 *
 * @param {miliseconds} time
 */
const syncSleep = async (time) => {
	await new Promise(resolve => setTimeout(resolve, time))
	return true
}

/**
 * Send File and delete them from temp memory
 *
 * @param {*} data
 * @param {name of the file} name
 */
const returnFileResponse = async (res, data, name = 'data', extention = 'csv') => {
	let filename = name + '.' + extention
	fs.writeFile(filename, data, function (error) {
		if (error) throw error;
		res.setHeader('Content-disposition', 'attachment; filename=' + filename);
		res.set('Content-Type', 'text/csv');
		res.status(200).send(data);
		fs.unlinkSync('./' + filename)
	})
};

/**
 * Regex checkfor email
 *
 * @param value the parameter that was wrong
 * @param err the error code that occured
 * @param ideal the ideal value/condition for the parameter that was wrong
 */
const isValidEmail = (emails) => {
	let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	let validEmails = []
	if (Array.isArray(emails)) {
		for (let i = 0; i < emails.length; i++) {
			if (reg.test(emails[i])) {
				validEmails.push(emails[i]);
			}
		}
		return validEmails;
	}
	return reg.test(emails);
};


/**
 * Get current timestamp
 * @returns {Promise<void>}
 */
const getCurrentTimestamp = () => {
	return moment();
};

/**
 * Convert to array if only value is coming
 * eg: if query data from DB use IN
 *
 * @param data
 * @returns {*}
 */
const convertToArray = (data) => {
	if (!Array.isArray(data)) {
		return [data];
	}
	return data;
};

/**
 * Logging module which will be built next hence shifting to logs
 * @param message
 */
const log = (req, ...message) => {
	console.log('trackingId: ' + req.headers.trackingId + ' ' + JSON.stringify(message));
};

/**
 * Console log the data as a string but with indentation in order to avoid [Object] Console log
 * @param  {...any} message
 */
const jsonLog = (...message) => {
	console.log(JSON.stringify(message, null, 4))
	return
}

/**
 * Parse the name to get the capitalized first name
 * @param {*} name Name
 * @returns
 */
const getFormattedName = (name) => {
	return _.capitalize(name.split(" ")[0])
}

const getImagePath = async (req) => {
	let filePath = '';
	if (req.files && req.files.image && req.files.image.path) {
		filePath = req.files.image.path;
	}
	return filePath;
};

const fileImageValidation = (image) => {
	let extension = image.type.split('/')
	if (extension[0] !== 'image') {
		return { status: false, error: Error.image_extension_not_supported }
	}
	if (!['png', 'jpg', 'svg', 'jpeg', 'webp'].includes(extension[1]) || extension.length !== 2) {
		return { status: false, error: Error.image_extension_not_supported }
	}
	return { status: true }
}

const isValidImage = (filePath) => {
	return !empty(filePath);
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
		error: ''
	};

	const headers = {
		"Content-Type": "application/json",
		"Accept": "application/json"
	};

	let params = {
		url: url,
		method: method,
		headers: headers,
		body: body,
		json: true
	};

	try {
		response.data = await rp(params);
	}
	catch (err) {
		response.success = false;
		response.error = err;
	}
	return response
};

/**
 * Get api Version
 *
 * @param {request} req
 */
const getVersion = (req) => {
	if (!empty(req.headers.version)) {
		return req.headers.version
	} else {
		return 'v0'
	}
};

/**
 * Return APP version of the app
 *
 * @param {*} req
 */
const getAppVersion = (req) => {
	return req.headers['app-version'] || ''
}

/**
 * Pluralize any word etc with any suffix
 * @param {*} count Count based on which pluralization will happen
 * @param {*} word Word to be pluralized
 * @param {*} suffix Suffix to be added behind the word
 * @param {*} returnCount Flag to return the count with the pluralized word
 * @returns
 */
const pluralize = (count, word, suffix = 's', returnCount = false) => {
	let plural = `${word}`
	if (count > 1) {
		plural = `${word}${suffix}`
	}
	if (returnCount) {
		plural = `${count} ${plural}`
	}
	return plural
}

/**
 * Return os of the app
 *
 * @param {*} req
 */
const getAppOS = (req) => {
	return req.headers['os'] || 'android'
}

/**
 * Replace object within text
 *
 * @param {text} key
 * @param {object} valueMap
 */
const getString = (key, valueMap = {}) => {
	let keys = Object.keys(valueMap)
	for (let i = 0; i < keys.length; i++) {
		key = key.replace('{' + keys[i] + '}', valueMap[keys[i]])
	}
	return key
}

const convertStringToCapitalize = (name = '') => {
	return (name.replace(/(^\w|\s\w)/g, m => m.toUpperCase()))
}

const getUniqueId = () => {
	return uuidv1()
}

const getSlug = (text = '') => {
	return text.replace(/[^A-Z0-9]/ig, "").toLowerCase()
}

const getAmountRoundOffViaCountry = (amount, currencyRoundOff = false) => {
	amount = parseFloat(amount)
	if (currencyRoundOff) {
		return Math.round(amount)
	} else {
		return amount.toFixed(2)
	}
}

const geti18String = (tag, localeCode = 'en', subs = {}) => {
	if (!['en', 'es'].includes(localeCode)) {
		localeCode = 'en'
	}
	return i18n.__({ phrase: tag, locale: localeCode }, subs)
}

/**
 * Function to extract the 10 digit number of the user from a string
 *
 * @param {*} topic
 * @returns phone number 0 if not found
 */
const getPhoneNumberFromString = (topic) => {
	let regex = /[\+]?\d{10}/
	let phone = topic.match(regex)
	if (phone) {
		return classResponse(true, phone[0], '');
	} else {
		return classResponse(false, {}, 'Phone Number not found')
	}
}


/////////////////// ENVIRONMENT VARIABLE FUNCTIONS ///////////////////
const isLocalEnvironment = () => {
	return serverConfig.node_env === 'local';
}

const isProdEnvironment = () => {
	return serverConfig.node_env === 'production';
}

const isDevEnvironment = () => {
	return serverConfig.node_env === 'development';
}

const isCronAllowed = () => {
	return serverConfig.run_cron === '1';
}
///////////////////////////////////////////////////////////////////////

/**
 * Generates an error based on the err type sent and the values
 *
 * @param value the parameter that was wrong
 * @param err the error code that occured
 * @param ideal the ideal value/condition for the parameter that was wrong
 */
const stringConcatinator = (...arguments) => {
	let args = Array.prototype.slice.call(arguments);
	return args.join("");
}

/**
 * Get the object key by value
 * @param {*} object
 * @param {*} value
 * @returns
 */
const getKeyByValue = (object, value) => {
	return Object.keys(object).find(key => object[key] === value);
}
/**
 * All days in the DB are days according to IST and might differ with days acc to UTC system.
 * @returns {string}
 * @param date
 */

const getISTWeekDayName = (date) => {
	return moment(date)
		.local()
		.format('dddd')
		.toLowerCase();
};

function getISTMonthName(momentDate) {
	return moment(momentDate)
		.local()
		.format('MMMM')
}

/**debug Logger**/
const logRequest = async (req, res, next) => {
	console.info(`${req.method} ${req.originalUrl}`)
	console.log(req.body)
	next()
}


module.exports = {
	isDevEnvironment,
	isLocalEnvironment,
	isProdEnvironment,
	getDateXDaysAhead,
	asyncMiddleware,
	makeAxiosRequest,
	parseJSON,
	geti18String,
	getFormattedDate,
	getPagination,
	setAsStartDateUTC,
	setAsEndDateUTC,
	getISTWeekDayName,
	getISTMonthName,
	logRequest,
	getKeyByValue,

	getUniqueId,
	isValidEmail,

	errorHandler,
	generateOTP,
	getCurrentTimestamp,
	convertToArray,
	parseSafe,
	classResponse,
	log,
	empty,
	sendResponse,
	isValidImage,
	makeRequest,
	getImagePath,
	getVersion,
	getAppVersion,
	getString,
	convertStringToCapitalize,
	fileImageValidation,
	returnFileResponse,
	syncSleep,
	getAppOS,
	getPhoneNumberFromString,
	stringToHex,
	getSlug,
	isCronAllowed,
	getAmountRoundOffViaCountry,
	jsonLog,
	getFormattedName,
	stringConcatinator,
	pluralize,

}
