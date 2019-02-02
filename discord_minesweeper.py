import random
import json
from flask import Flask
from flask import jsonify

emoji_digits = [":zero:", ":one:", ":two:", ":three:",
                ":four:", ":five:", ":six:",
                ":seven:", ":eight:", ":nine:"]

mine_emoji = ":bomb:"

mine = -1
max_size = 14

def generate_maze(size, difficulty):
    if difficulty < 1 or difficulty > 9:
        raise AttributeError("Difficulty must be between 1 and 9")
    if size < 0 or size > max_size:
        raise AttributeError("Size must be between 0 and 14")

    # Initialize 2D array to all 0's
    board = [ [0 for _ in range(size)] for _ in range(size)]

    chance_of_bomb = 1 / (10 - difficulty)

    # Set "bomb" squares to -1
    for i in range(size):
        for j in range(size):
            if random.random() < chance_of_bomb:
                board[i][j] = mine

    # Count the bomb squares adjacent to each square
    for i in range(size):
        for j in range(size):
            # Skip the mines themselves
            if board[i][j] == mine:
                continue

            # Check adjacent squares
            for k in range(-1, 2):
                for l in range(-1, 2):
                    if j == 0 and l == -1:  # manual checking because the errors are'nt getting thrown i guess
                        continue
                    if i == 0 and k == -1:
                        continue
                    try:
                        if board[i + k][j + l] == mine:
                            board[i][j] += 1
                    except IndexError:
                        continue

    for i in range(size):
        print(board[i])

    return board


def board_to_string(board):
    string_board = ""
    for row in board:
        for square in row:
            if square == mine:
                string_board += mark_spoiler(mine_emoji)
            else:
                string_board += mark_spoiler(emoji_digits[square])
        string_board += "\n"

    return string_board


def mark_spoiler(string):
    return "||%s||" % string

app = Flask(__name__)

@app.route('/minesweeper', methods=['GET'])
def default_board():
    return custom_size_and_difficulty(5, 3)


@app.route('/minesweeper/<size>', methods=['GET'])
def custom_size(size):
    size = int(size)
    return custom_size_and_difficulty(size, 3)

@app.route('/minesweeper/<size>/<difficulty>', methods=['GET'])
def custom_size_and_difficulty(size, difficulty):
    size = int(size)
    difficulty = int(difficulty)
    return jsonify(board_to_string(generate_maze(size, difficulty)))

@app.errorhandler(ValueError)
def invalid_number(e):
    return "Size and difficulty must be integers", 400

@app.errorhandler(Exception)
def invalid_number(e):
    return str(e), 400


if __name__ == '__main__':
    app.run(debug=True)
