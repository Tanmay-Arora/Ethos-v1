module.exports = (seq_instance, sequelize) => {
    const Cart = seq_instance.define('carttable', {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: {
            allowNull: false,
            type: sequelize.STRING
        },
        productid: {
            allowNull: false,
            type: sequelize.STRING
        },
        productname: {
            allowNull: false,
            type: sequelize.STRING
        },
        productprice: {
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
        productimage: {
            allowNull: false,
            type: sequelize.STRING
        }   
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Cart;
}



