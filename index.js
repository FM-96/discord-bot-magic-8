var Discord = require('discord.js');
var fs = require('fs');

var botToken = null;
var bot = new Discord.Client();
var answers = require('./answers.js');

//get discord bot token
if (!fileExists(__dirname + '/discord_bot_token.txt')) {
	//create file
	fs.closeSync(fs.openSync(__dirname + '/discord_bot_token.txt', 'w'));
}
//read token from file
botToken = fs.readFileSync(__dirname + '/discord_bot_token.txt', 'utf8');
if (!botToken) {
	console.log('No bot token found.');
	console.log('Save the token in discord_bot_token.txt and restart the application.');
	process.exit(0);
} else {
	console.log('Bot token loaded.');
}

bot.on('message', function (message) {
	if (message.isMentioned(bot.user)) {
		message.channel.send(answers[Math.floor(Math.random() * answers.length)]).catch(function (err) {
			console.log('Error sending message: ' + err);
		});
	}
});

bot.on('ready', function () {
	console.log('Successfully logged into Discord.');
	console.log('Bot is ready.');
});

bot.on('error', function (error) {
	console.log('Discord Error: ' + error);
});

bot.on('warn', function (warning) {
	console.log('Discord Warning: ' + warning);
});

//start bot
bot.login(botToken);

//utility functions
function fileExists(path) {
	try {
		fs.statSync(path);
		return true;
	} catch (e) {
		return false;
	}
}
