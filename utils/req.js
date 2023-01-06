// Match any character not present in the set
const xssRegex = /[^-A-Za-z0-9+&@#/%?=~_|!:,.;\(\)]/;

// Sanitize URL to prevent XSS filter evasion
// https://stackoverflow.com/questions/205923/best-way-to-handle-security-and-avoid-xss-with-user-entered-urls
// https://owasp.org/www-community/xss-filter-evasion-cheatsheet
const sanitizeUrl = (url) => {
    return url.replace(xssRegex, "").trim();
}

const getIP = (req) => {
    return req.headers['x-forwarded-for'] || req.hostname
}

/**
 * printHeaders will return all headers required to be logged from requested headers
 * @param req           req object from api calls
 * @returns {string}
 */
const printHeaders = (req) => {
    let minifiedHeaders = {}
    if (req.headers.hasOwnProperty('app-version')) {
        minifiedHeaders['app-version'] = req.headers['app-version']
    }
    if (req.headers.hasOwnProperty('lang-code')) {
        minifiedHeaders['lang-code'] = req.headers['lang-code']
    }
    if (req.headers.hasOwnProperty('version')) {
        minifiedHeaders['version'] = req.headers['version']
    }
    minifiedHeaders.trackingId = req.headers.trackingId || ''
    return JSON.stringify(minifiedHeaders)
}

/**
 * Check weater req has admin rights or not  
 * @param {*} req 
 */
const isAdmin = (req) => {
    if (req.user.roles.includes('admin')) {
        return true
    }
    return false
}

/**
 * Check weater req has superSupport rights or not  
 * @param {*} req 
 */
const isSuperSupport = (req) => {
    if (req.user.roles.includes('superSupport')) {
        return true
    }
    return false
}


module.exports = {
    sanitizeUrl: sanitizeUrl,
    getIP: getIP,
    printHeaders: printHeaders,
    isAdmin,
    isSuperSupport
}

