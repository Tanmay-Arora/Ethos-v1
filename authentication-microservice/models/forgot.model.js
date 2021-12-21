module.exports = (sequelize, Sequelize) => {
    const Otp = sequelize.define("forgotdb", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        otp: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        timestamps: false,
        freezeTableName: true
    });
  
    return Otp;
  };