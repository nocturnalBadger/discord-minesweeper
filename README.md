# discord-minesweeper

Play minesweeper over discord. Made possible by ||spoiler|| tags.

Made by Adam and Jeremy in like 10 hours.

## Invite link:
If you don't care how this code works, and just want to use our hosted instance of the bot on your Discord guild, click here
https://discordapp.com/oauth2/authorize?&client_id=541068913572708352&scope=bot&permissions=67584

We're not making any promises as to uptime or reliability with our hosted version so if you want to run the code yourself with your own API credentials, read on.

## Server-side instructions:

0. Place auth token in auth.json (you're on your own for this)
1. Install node dependencies:
  `npm install`
2. Start backend flask server:
  `python3 discord_minesweeper.py &`
  
  This will start a server listening at localhost:5000 which can accept the following API requests:
  
    GET /minesweeper - Get a minesweeper board with the default options (size=5, difficulty=3)
    
    GET /minesweeper/{size} - Get a minesweeper board with a custom size (difficulty=3)
    
    GET /minesweeper/{size}/{difficulty} - Get a minesweeper board with a custom size and difficulty
  
3. Start bot server program: `node bot.js`
  
 
