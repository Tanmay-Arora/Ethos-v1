module.exports = (seq_instance, sequelize) => {
    const Auth = seq_instance.define('authtable', {
        name: {
            allowNull: false,
            type: sequelize.STRING
        },
        email: {
            allowNull: false,
            unique: true,
            type: sequelize.STRING
        },
        phone: {
            primaryKey: true,
            allowNull: false,
            unique: true,
            type: sequelize.STRING
        },
        password: {
            allowNull: false,
            type: sequelize.STRING
        }   
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Auth;
}

    

    
   
        
    




