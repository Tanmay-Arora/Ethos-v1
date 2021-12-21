var express = require('express');

module.exports = app => {
    const auth = require('../controller/auth.controller.js');
    const otp = require('../controller/forgot.controller.js')

    var router = express.Router();

    router.post('/register', auth.register);
    router.post('/login', auth.login);
    router.post('/forgot', otp.forgot);
    router.post('/reset', otp.reset);

    app.use('/users', router);
};