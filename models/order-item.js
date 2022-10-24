const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const oderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = oderItem;