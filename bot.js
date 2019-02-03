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
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

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
                        'info: a little information on the bot\n' +
                        'minesweeper: usage minesweeper 10 5: creates a 10x10 field of mines with a difficulty of 5```'
                })
                break;
            case 'info':
                var totalGuilds = Object.keys(bot.servers).length;
                bot.sendMessage({
                    to: channelID,
                    message: '```This bot was created by Adam and Jeremy. Why?, Why not?\n\nCurrently serving ' +  totalGuilds + ' servers```'
                })
                break;
            case 'mines':
                var msg = "none";
                var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", "http://127.0.0.1:5000/minesweeper", false);
                xmlHttp.send( null );
                msg = JSON.parse(xmlHttp.responseText);

                bot.sendMessage({
                    to: channelID,
                    message: msg
                })
                break;

            case 'minesweeper':
                var msg = "none";
                var size = args[1];
                var difficulty = args[2];
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
