const expressJwt = require('express-jwt');

function jwt() {
    const secret = 'secret';
    return expressJwt({ secret, algorithms: ['HS256']});
}

module.exports = jwt;
