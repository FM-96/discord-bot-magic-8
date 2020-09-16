var Discord = require('discord.js');

var fs = require('fs');
var path = require('path');

var botToken = null;
var bot = new Discord.Client({
	ws: {
		intents: Discord.Intents.NON_PRIVILEGED,
	},
});
var answers = require('./answers.js');

// get discord bot token
if (!fileExists(path.join(__dirname, 'discord_bot_token.txt'))) {
	// create file
	fs.closeSync(fs.openSync(path.join(__dirname, 'discord_bot_token.txt'), 'w'));
}
// read token from file
botToken = fs.readFileSync(path.join(__dirname, 'discord_bot_token.txt'), 'utf8');
if (!botToken) {
	console.log('No bot token found.');
	console.log('Save the token in discord_bot_token.txt and restart the application.');
	process.exit(0);
} else {
	console.log('Bot token loaded.');
}

bot.on('message', function (message) {
	if (message.mentions.has(bot.user, {
		ignoreEveryone: true,
		ignoreRoles: true,
	})) {
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

// start bot
bot.login(botToken);

// utility functions
function fileExists(filePath) {
	try {
		fs.statSync(filePath);
		return true;
	} catch (e) {
		return false;
	}
}
