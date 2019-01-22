//initiate database
const Sequelize = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.dburl);

//export db template
module.exports = sequelize;
