const { response } = require("express");
const params = require("../models/db.connection");
const Cart = params.Cart;
const Order = params.Order;
const razorpay = params.razorpay;
const axios = params.axios;
const Op = params.sequelize.Op;

exports.storeInCart = (req, res) => {
  const cartitem = {
    userid: req.body.userid,
    productid: req.body.productid,
    productname: req.body.productname,
    productprice: req.body.productprice,
    quantity: req.body.quantity,
    size: req.body.size,
    productimage: req.body.productimage,
  };

  Cart.create(cartitem)
    .then((data) => {
      res.status(200).send({
        message: "Item Added Successfully",
      });
      mailer(req.body.email, req.body.productname);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Failed to add item to Cart",
      });
    });
};

exports.fetchFromCart = (req, res) => {
  let id = req.params.Id;
  Cart.findAll({ where: { userid: id }, raw: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error in Fetching Products",
      });
    });
};

exports.removeFromCart = (req, res) => {
  let did = req.params.Id;
  Cart.destroy({ where: { id: did } })
    .then((data) => {
      res.send({
        message: "Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error in Deleting Products",
      });
    });
};

exports.updateQuantity = (req, res) => {
  qty = req.body.quantity;
  did = req.params.Id;
  Cart.update({ quantity: qty }, { where: { id: did } })
    .then((data) => {
      res.send({
        message: "Quantity Updated Successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error in Updating Quantity",
      });
    });
};

exports.updateSize = (req, res) => {
  s = req.body.size;
  did = req.params.Id;
  Cart.update({ size: s }, { where: { id: did } })
    .then((data) => {
      res.send({
        message: "Size Updated Successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error in Updating Size",
      });
    });
};

exports.placeOrder = (req, res) => {
  let options = {
    amount: parseInt(req.body.amount) * 100,
    currency: "INR",
  };

  razorpay.orders.create(options, (err, order) => {
    console.log(order);
    res.json(order);
  });
};

exports.createOrder = (req, res) => {
  let id = req.body.id;
  products = [];
  Cart.findAll({ where: { userid: id }, raw: true })
    .then((data) => {
      products = data;
      console.log(data);
      data.forEach((element) => {
        let orderObject = {
            orderid: req.body.orderid,
            userid: id,
            productids: element.productid,
            quantity: element.quantity,
            size: element.size
          };
          console.log(orderObject);
  
          Order.create(orderObject)
            .then((data) => {
              console.log(data);
              //mailer(req.body.email, req.body.productname);
            })
            .catch((err) => {
              console.log(err);
            });
      });
      res.status(200).send({ message: "Order Placed" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error in Fetching Products",
      });
    });

  // for(let i=0; i<products; i++){
  //     let orderObject = {
  //         orderid: req.body.orderid,
  //         userid: id,
  //         productids: products[i].productid,
  //         quantity: products[i].quantity,
  //         size: products[i].size
  //     }
  //     console.log(orderObject);

  //     Order.create(orderObject).then( data => {
  //         res.status(200).send({
  //             message: 'Item Ordered Successfully'
  //         })
  //         mailer(req.body.email, req.body.productname);
  //     }).catch(err => {
  //         res.status(500).send({
  //             message: err.message || 'Failed to Order items'
  //         })
  //     })
  // }
};

const mailer = (email, name) => {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "demouser179301213@gmail.com",
      pass: "demo@1234",
    },
  });

  var mailOptions = {
    from: "demouser179301213@gmail.com",
    to: email,
    subject: "An item was added to your cart.",
    text: `${name} was successfully added to cart`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
