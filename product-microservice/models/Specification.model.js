module.exports = (seq_instance, sequelize) => {
    const Specifications = seq_instance.define('spectable', {
        id: {
            allowNull: false,
            type: sequelize.STRING,
            primaryKey: true
        },
        spec: {
            allowNull: false,
            type: sequelize.STRING
        },
        images: {
            allowNull: false,
            type: sequelize.STRING
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Specifications;
}



