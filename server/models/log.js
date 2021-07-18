const db = require("../db");
const { DataTypes } = require('sequelize')

//user schemea
const Log = db.define('log', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    definition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    result: {
        type: DataTypes.STRING(100),
        allowNull: false,
        },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Log