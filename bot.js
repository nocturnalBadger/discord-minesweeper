src
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

        args = args.splice(1);
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
                    message: '```Commands:\ninfo: a little information on the bot\nminesweeper: usage minesweeper 10 5: creates a 10x10 field of mines with 5 mines```'
                })
                break;
            case 'mines':
                /*var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
                var xhttp = new XMLHttpRequest();
                var msg = xhttp.responseText();
                xhttp.open("GET", "http://127.0.0.1:5000/minesweeper", true);
                var msg = xhttp.send();*/
                var msg = $.get("http://127.0.0.1:5000/minesweeper", "html")
                bot.sendMessage({
                    to: channelID,
                    message: msg
                })
                // Just add any case commands if you want to..
        }
    }
});