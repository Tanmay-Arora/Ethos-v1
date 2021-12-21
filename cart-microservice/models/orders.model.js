module.exports = (seq_instance, sequelize) => {
    const Order = seq_instance.define('ordertable', {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderid: {
            allowNull: false,
            type: sequelize.STRING,
        },
        userid: {
            allowNull: false,
            type: sequelize.STRING
        },
        productids: {
            allowNull: false,
            type: sequelize.STRING
        },
        quantity: {
            allowNull: false,
            type: sequelize.STRING
        },
        size: {
            allowNull: false,
            type: sequelize.STRING
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Order;
}



