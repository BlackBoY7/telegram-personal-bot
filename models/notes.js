const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//create notes model
var notes = sequelize.define('notes', {
	id: {
	type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
	},
    title: {
        type: Sequelize.STRING,
	    allowNull: false
    },
    content: {
        type: Sequelize.STRING,
	    allowNull: false
    }
});

module.exports = notes;
