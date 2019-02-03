#!/usr/bin/env bash

if ! source venv/bin/activate; then
    echo "Failed to activate virtual environment"
    exit 1
fi

if ! pip install --upgrade flask; then
    echo "Failed to install python dependencies"
    exit 1
fi

if ! npm install; then
    echo "Failed to install node dependencies"
    exit 1
fi

python discord_minesweeper.py &
sleep 3

if ! curl localhost:5000; then
    echo "Failed to reach flask server"
    exit 1
fi

if !  node bot.js; then
    echo "Failed to start bot"
    exit 1
fi
