module.exports = (seq_instance, sequelize) => {
    const Address = seq_instance.define('addresstable', {
        id:{
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: sequelize.INTEGER 
        },
        phone: {
            allowNull: false,
            type: sequelize.STRING
        },
        name: {
            allowNull:false,
            type: sequelize.STRING
        },
        address: {
            allowNull: false,
            type: sequelize.STRING
        },
        city: {
            allowNull: false,
            type: sequelize.STRING
        },
        state: {
            allowNull: false,
            type: sequelize.STRING
        },
        pincode: {
            allowNull: false,
            type: sequelize.STRING
        }   
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Address;
}