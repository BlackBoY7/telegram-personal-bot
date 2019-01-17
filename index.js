
//import config
var config = require('./config');

//start bot
var telegram = require('node-telegram-bot-api');
var bot = new telegram(config.token, {polling: true});

bot.on('message', (msg) => {
    //check if message is from owner else report
    if(msg.from.id != config.owner.id){
        bot.sendMessage(config.owner.id, 'New message from ${msg.from.id}: ${msg.text}');
        return;
    };
});
