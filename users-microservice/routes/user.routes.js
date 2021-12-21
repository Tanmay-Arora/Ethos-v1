var express = require('express');
const { User } = require('../models/db.connection.js');

module.exports = app => {
    const Users = require('../contoller/user.controller.js');

    var router = express.Router();

    router.post('/addAddress', Users.setAddress);
    router.get('/getAddress/:Id', Users.fetchAddress);
    router.get('/getAllAddress', Users.fetchAllAddress);
    

    app.use('/user', router);
};