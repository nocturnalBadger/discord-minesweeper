
emoji_digits = [":zero:", ":one:", ":two:", ":three:",
                ":four:", ":five:", ":six:",
                ":seven:", ":eight:", ":nine:"]

mine_emoji = ":bomb:"

def generate_maze(size, num_mines):
    bomb_pos = [random.randint(0, size) for _ in range(num_mines)
