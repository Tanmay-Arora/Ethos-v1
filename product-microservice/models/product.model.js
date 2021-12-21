
module.exports = (seq_instance, sequelize) => {
    const Product = seq_instance.define('producttable', {
        id: {
            allowNull: false,
            type: sequelize.STRING,
            primaryKey: true
        },
        type: {
            allowNull: false,
            type: sequelize.STRING
        },
        price: {
            allowNull: false,
            type: sequelize.STRING
        },
        name: {
            allowNull: false,
            type: sequelize.STRING
        },
        caption: {
            allowNull: false,
            type: sequelize.STRING
        },
        desc: {
            allowNull: false,
            type: sequelize.STRING
        },
        image: {
            allowNull: false,
            type: sequelize.STRING
        }   
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Product;
}



