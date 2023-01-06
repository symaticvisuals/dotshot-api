const bcrypt = require('bcrypt');
const utils = require('./utils');

const saltRounds = 10;
const LOGIN_EXPIRE_TIME = 365 * 24 * 60 * 60 * 1000; // in milliseconds i.e. 1 year

/**
 * Hash of given password/string
 * @param data
 * @returns {Promise<void>}
 */
const checkOtpValid = (otp) => {
    if (!isNaN(otp) && otp.toString().length == 6) {
        return true
    }
    return false
};

/**
 * Hash of given password/string
 * @param data
 * @returns {Promise<void>}
 */
const generateHash = async (data) => {
    return await bcrypt.hash(data, saltRounds)
};

/**
 * user should be model object
 * @param user
 * @returns {Promise<void>}
 */
const setUserHashPassword = async (user) => {
    if (user._changed.password) {
        let hash = await generateHash(user.get('password'));
        user.set('password', hash)
    }
};

/**
 * Get the app login expire time in Unix timestamp format
 * @returns 
 */
const getLoginExpireTime = () => {
    return utils.getCurrentTimestamp() + LOGIN_EXPIRE_TIME;
};

module.exports = {
    setUserHashPassword,
    getLoginExpireTime: getLoginExpireTime,
    checkOtpValid
};