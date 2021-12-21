var sequelize = require('sequelize');
var dbConfig = require('../db.config');


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


const params = {};

params.sequelize = sequelize;
params.seq_instance = seq_instance;

params.Product = require('./product.model.js')(seq_instance, sequelize);
params.Specifications = require('./Specification.model.js')(seq_instance, sequelize);

module.exports = params;
