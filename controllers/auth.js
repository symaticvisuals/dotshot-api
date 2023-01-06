const { default: axios } = require("axios");
var { expressjwt: jwt } = require("express-jwt");
const User = require('../classes/User/User')
var jwks = require('jwks-rsa');
const utils = require('../utils/utils');
const authConfig = {
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE
};

// Authentication middleware. When used, the
const isJWT = utils.asyncMiddleware(async (req, res, next) => {
    try {
        const checkJwt = jwt({
            // Dynamically provide a signing key
            // based on the kid in the header and 
            // the singing keys provided by the JWKS endpoint.
            secret: jwks.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
            }),

            // Validate the audience and the issuer.
            audience: authConfig.audience,
            issuer: `https://${authConfig.domain}/`,
            algorithms: ['RS256']
        });

        checkJwt(req, res, next)

    }
    catch (err) {
        // set status code to 401
        next(err);
    }
})


const getUserFromAuth0 = utils.asyncMiddleware(async (req, res, next) => {
    const accessToken = req.headers['authorization'].split(' ')[1];
    try {
        const userInfo = await axios.get(`https://${authConfig.domain}/userinfo`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        const { nickname, picture, email, email_verified } = userInfo.data;

        req.user = {
            name: nickname,
            picture,
            email,
            isEmailVerified: email_verified,
        }
        next();
    } catch (err) {
        next(err);
    }

})

const checkAllowedRoles = (roles) => {
    // check the database for the user
    // if the user exists, return false
    // if the user does not exist, return true
    return utils.asyncMiddleware(async (req, res, next) => {
        try {
            let user = req.user;
            let response = await User.Get({ email: user.email });
            if (!response.success) {
                return utils.sendResponse(req, res, response.success, response.data, response.err);
            }
            if (response.data.length === 0) {
                return utils.sendResponse(req, res, false, null, 'User not found');
            }
            let userRoles = response.data[0].roles;
            let allowed = false;
            for (let i = 0; i < userRoles.length; i++) {
                if (roles.includes(userRoles[i])) {
                    allowed = true;
                    break;
                }
            }
            if (!allowed) {
                return utils.sendResponse(req, res, false, null, 'User not allowed');
            }
            return next();
        } catch (err) {
            return next(err);
        }
    })
}


module.exports = {
    isJWT,
    getUserFromAuth0,
    checkAllowedRoles
}