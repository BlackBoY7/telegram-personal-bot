
//import config
const config = require('./config');

//start bot
const telegram = require('node-telegram-bot-api');
const bot = new telegram(config.token, {polling: true});

bot.on('message', (msg) => {
    //check if message is from owner else report
    if(msg.from.id != config.owner.id){
        bot.sendMessage(config.owner.id, 'New message from ${msg.from.id}: ${msg.text}');
        return;
    };
});

//initiate database
const Sequelize = require('Sequelize');
const sequelize = new Sequelize(config.dburl);

//To test mysql connection
sequelize.authenticate().then(function (err) {
    if(err){
        bot.sendMessage(config.log, 'Unable to connect to the database: ' + err);
    }else{
        sequelize.sync();
        bot.sendMessage(config.log, 'Database connection has been established successfully.');
    }
});