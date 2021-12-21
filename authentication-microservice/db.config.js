module.exports = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: '179301213',
    DB: 'authentication',
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};