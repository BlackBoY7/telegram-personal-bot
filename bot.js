//import config
const config = require("./config");

//start bot
const Telegraf = require("telegraf");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const wizardScene = require("telegraf/scenes/wizard");
const bot = new Telegraf(config.token);
const sequelize = require("./utils/database");

//commands
var cmd1 = "addnote";

//import db models
const notes = require("./models/notes");

//add note scene
const addNote = new wizardScene("addnote",
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
		   return ctx.wizard.next();
    }
);

//start bot
const stage = new Stage([addNote]);
bot.use(session());
bot.use(stage.middleware());
bot.startPolling();

//core
bot.start((ctx) => ctx.reply(`Hello ${ctx.from.first_name}!`));
bot.on('text', (ctx) => {
    if(ctx.from.id != config.owner.id){
        return;
    }
});
bot.hears(cmd1, Stage.enter("addnote"));

//to test database connection
sequelize.authenticate().then(function (err) {
    if(err){
        bot.telegram.sendMessage(config.owner.id, `Unable to connect to the database: ${err}`);
    }else{
        sequelize.sync();
        bot.telegram.sendMessage(config.owner.id, "Connected to database");
    }
});
