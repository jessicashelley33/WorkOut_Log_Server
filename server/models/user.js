const db = require("../db");
const { DataTypes } = require('sequelize')

//user schemea
const User = db.define('user', {
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unqiue: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = User