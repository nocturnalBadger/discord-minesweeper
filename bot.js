var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

var prefix = '!mines';
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.startsWith('!mines') || message.startsWith('!minesweeper')) {
        var args = message.split(' ');
        var cmd = args[1];

        //args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: '```Commands:\n' +
                        '!mines play <size> <difficulty>\n' +
                        '  Generates a random square minefield of the given size the given difficulty (1-9)\n' +
                        '!mines info\n' +
                        '  Print info about the bot\n' +
                        '!mines help\n' +
                        '  Print this help message (clearly you\'ve already figured this one out)```'
                })
                break;
            case 'info':
                var totalGuilds = Object.keys(bot.servers).length;
                bot.sendMessage({
                    to: channelID,
                    message: '```This bot was created by Adam and Jeremy. Why?, Why not?\n\nCurrently serving ' +  totalGuilds + ' servers```'
                })
                break;
            case 'play':
                var msg = "none";
                var size = args[2];
                var difficulty = args[3];
                var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", "http://127.0.0.1:5000/minesweeper/" + size + "/" + difficulty, false);
                xmlHttp.send( null );
                if (xmlHttp.status == 200){
                    msg = JSON.parse(xmlHttp.responseText);
                }
                else
                    msg = xmlHttp.responseText;
                bot.sendMessage({
                    to: channelID,
                    message: msg
                })
                break;
                // Just add any case commands if you want to..
        }
    }
});
