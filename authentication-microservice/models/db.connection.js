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


// Checking connection
/*
seq_instance.authenticate().then( () => {
    console.log("Connected to database successfully...");
}).catch (err => {
    console.error(`Unable to connec to DB, reason: ${err}`);
}).finally ( () => {
    seq_instance.close();    
})
*/





const params = {};

params.sequelize = sequelize;
params.seq_instance = seq_instance;

params.Auth = require('./auth.model.js')(seq_instance, sequelize);
params.Otp =  require('./forgot.model.js')(seq_instance, sequelize);

module.exports = params;
