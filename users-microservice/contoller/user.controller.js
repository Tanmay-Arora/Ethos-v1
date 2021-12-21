const params = require('../models/db.connection');
const Address = params.Address;
const Op = params.sequelize.Op;

//setAddress
exports.setAddress = (req, res) => {
    const addressItem = {
        phone: req.body.userid,
        name: req.body.name,
        address: req.body.addr,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode
    }

    Address.create(addressItem).then( data => {
        res.status(200).send({
            message: 'Address Added Successfully'
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Failed to add new Address'
        })
    })
}

//fetchAddress
exports.fetchAddress = (req, res) => {
    let id = req.params.Id;
    Address.findAll({where:{phone: id},raw: true}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error in Fetching Addresses"
        });
    })
}

//fetchAllAddress
exports.fetchAllAddress = (req, res) => {
    Address.findAll({raw: true}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error in Fetching Addresses"
        });
    })
}



