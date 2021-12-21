var express = require('express');

module.exports = app => {
    const Cart = require('../controller/cart.controller.js');

    var router = express.Router();

    router.post('/addtocart', Cart.storeInCart);
    router.get('/fetchfromcart/:Id', Cart.fetchFromCart);
    router.delete('/removeItem/:Id', Cart.removeFromCart);
    router.put('/updateQuantity/:Id', Cart.updateQuantity);
    router.put('/updateSize/:Id', Cart.updateSize);
    router.post('/order', Cart.placeOrder);
    router.post('/createorder', Cart.createOrder);

    app.use('/cart', router);
}