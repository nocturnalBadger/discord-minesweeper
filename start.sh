#!/bin/bash

source venv/bin/activate

pip install --upgrade flask

npm install

python discord_minesweeper.py

node bot.js
