
//import config
var config = require('./config');

//start bot
var telegram = require('telegram-bot-api');
var bot = new telegram({
    token: config.token
});
