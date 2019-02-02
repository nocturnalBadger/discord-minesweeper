import random

emoji_digits = [":zero:", ":one:", ":two:", ":three:",
                ":four:", ":five:", ":six:",
                ":seven:", ":eight:", ":nine:"]

mine_emoji = ":bomb:"

mine = -1

def generate_maze(size, num_mines):
    bomb_pos = [(random.randint(0, size), random.randint(0, size))
            for _ in range(num_mines)]

    # Initialize 2D array to all 0's
    board = [ [0 for _ in range(size)] for _ in range(size)]

    # Set "bomb" squares to -1
    for i in range(size):
        for j in range(size):
            if (i, j) in bomb_pos:
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
                    if j == 0 and l == -1:
                        continue
                    if i == 0 and k == -1:
                        continue
                    try:
                        if board[i + k][j + l] == mine:
                            board[i][j] += 1
                    except IndexError:
                        #index1 = i+k
                        #index2 = j+l
                        #print(f"index error thrown on [{index1}] [{index2}]")
                        continue

    for i in range(size):
        print(board[i])

    return board


def board_to_string(board):
    string_board = ""
    for row in board:
        for square in row:
            if square == mine:
                string_board += mine_emoji
            else:
                string_board += emoji_digits[square]
        string_board += "\n"

    return string_board


def mark_spoiler(string):
    return "||%s||" % string


    print(bomb_pos)
    print(board)


board = generate_maze(6, 3)
print(board_to_string(board))



