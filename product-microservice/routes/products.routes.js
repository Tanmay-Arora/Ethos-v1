var express = require('express');

module.exports = app => {
    const products = require('../controller/product.controller.js');

    var router = express.Router();

    router.get('/latestproducts', products.fetchTopProducts);
    router.get('/specs/:Id', products.fetchSpec);
    router.get('/product/:Id', products.fetchProduct);
    router.get('/filterproducts/:Type', products.filteredProducts)

    app.use('/listing', router)
};