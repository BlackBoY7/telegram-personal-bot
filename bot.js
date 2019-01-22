//import config
const config = require("./config");

//start bot
const Telegraf = require("telegraf");
const stage = require("telegraf/stage");
const session = require("telegraf/session");
const wizardScene = require("telegraf/scenes/base");
const bot = new Telegraf(config.token);
const sequelize = require("./utils/database");

//start bot
bot.startPolling();
bot.use(session());
bot.use(stage.middleware());

//commands
var cmd1 = "#addnote";

//import db models
const notes = require("./models/notes");

//add note scene
const addNote = new wizardScene('add-note',
    (ctx) => {
	    ctx.reply("let's add a note!\nTitle of note:");
		return ctx.wizard.next();
    },
    (ctx) => {
	    Title = ctx.message.text;
		ctx.reply('Content of Note: ');
		return ctx.wizard.next();
    },
    (ctx) => {
		Content = ctx.message.text;
		notes.create({
			title: Title,
			content: Content
        }).then(function(err) {
			if(err){
				ctx.reply(err);
			}else{
				ctx.reply("Done!");
			}
		});
		return ctx.scene.leave()
    }
);

//core
bot.on('text', (ctx) => {
	if(ctx.from.id != config.owner.id){
		return;
	}else{
		bot.hears(cmd1, stage.enter('add-note'));
	}
});

//to test database connection
sequelize.authenticate().then(function (err) {
    if(err){
        bot.sendMessage(config.owner.id, `Unable to connect to the database: ${err}`);
    }else{
        sequelize.sync();
        bot.telegram.sendMessage(config.owner.id, "Connected to database");
    }
});
