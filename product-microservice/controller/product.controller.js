const params = require('../models/db.connection');
const Product = params.Product;
const Specifications = params.Specifications;
const Op = params.sequelize.Op;


exports.fetchTopProducts = (req, res) => {
    Product.findAll({limit: 5, raw: true}).then((data) => {
        console.log(data);
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error in Fetching Products"
        });
    })
}

exports.fetchProduct = (req, res) => {
    let id = req.params.Id;
    Product.findByPk(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error Fetching Product Details"
        });
    })
}

exports.fetchSpec = (req, res) => {
    let id = req.params.Id;
    Specifications.findByPk(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error Fetching Specifications"
        })
    })
}

exports.filteredProducts = (req, res) => {
    let type = req.params.Type;
    Product.findAll({where: {type:{[Op.like]: `${type}%`}},raw: true}).then((data) => {
        console.log(data);
        res.send(data);
    }).catch((err) => {
        res.send(500).send({
            message: err.message || "Error Fetching Products"
        })
    })
}