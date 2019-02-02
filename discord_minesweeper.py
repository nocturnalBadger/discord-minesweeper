import random

emoji_digits = [":zero:", ":one:", ":two:", ":three:",
                ":four:", ":five:", ":six:",
                ":seven:", ":eight:", ":nine:"]

mine_emoji = ":bomb:"

def generate_maze(size, num_mines):
    bomb_pos = [(random.randint(0, size), random.randint(0, size))
            for _ in range(num_mines)]

    # Initialize 2D array to all 0's
    board = [ [0 for _ in range(size)] for _ in range(size)]

    # Set "bomb" squares to -1
    for i in range(size):
        for j in range(size):
            if (i, j) in bomb_pos:
                board[i][j] = -1

    # Count the bomb squares adjacent to each square
    for i in range(size):
        for j in range(size):
            adjacent_bombs = 0



    print(bomb_pos)
    print(board)


generate_maze(5, 3)

    
