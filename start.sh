#!/bin/bash

source bot_env/bin/activate

python discord_minesweeper.py &

node bot.js
