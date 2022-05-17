const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Operator = sequelize.define('operator', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, require: true},
})

const Content = sequelize.define('content', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, require: true},
    url: {type: DataTypes.STRING, require: true},
})

Operator.hasMany(Content)
Content.belongsTo(Operator)

module.exports = {
    Operator,
    Content
}