const multipart = require('connect-multiparty');
const TMP_DIR = '/tmp/';

const multipartMiddleware = multipart({uploadDir: TMP_DIR});

module.exports = {
    multipartMiddleware: multipartMiddleware,
}