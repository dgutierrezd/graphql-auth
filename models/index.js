const Sequelize = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
);

const db = {
    User: sequelize.import('./user.js')
}

db.sequelize = sequelize;

module.exports = db;