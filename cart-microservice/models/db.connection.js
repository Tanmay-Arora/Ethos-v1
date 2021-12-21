var sequelize = require('sequelize');
const Razorpay = require('razorpay');
var dbConfig = require('../db.config');


const razorpay = new Razorpay({
    key_id: 'rzp_test_vyJglBXedDjebz',
    key_secret: 'bL962cC6PS64ocBLyRUUuTTx'
})


var seq_instance = new sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        min: dbConfig.pool.min,
        max: dbConfig.pool.max,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}); 

var r_instance = new Razorpay(razorpay);


const params = {};

params.razorpay = razorpay;
params.r_instance = r_instance;
params.sequelize = sequelize;
params.seq_instance = seq_instance;
params.Cart = require('./cart.model.js')(seq_instance, sequelize);
params.Order = require('./orders.model.js')(seq_instance, sequelize);

module.exports = params;