from time import sleep
import json
import sys

from game.game_loop import update_game
from game.api import API
from game.models import Game
from ai import step


UpdatesPerSecond = 3  # how many times we should contact the server per second


def main():
    game_id = Game.RankedGameId

    player_id, player_secret = read_config()
    api = API(player_id, player_secret)

    while True:
        update_game(api, game_id, step)

        sleep(1 / UpdatesPerSecond)


def read_config():
    ConfigFile = "player.json"
    DefaultConfigFile = "player.default.json"
    DefaultConfigValue = "REPLACEME"  # default value in the config file

    try:
        with open(ConfigFile) as f:
            data = json.load(f)
            id_ = data["player_id"]
            secret = data["player_secret"]

            if id_ == DefaultConfigValue or secret == DefaultConfigValue:
                print("WARNING: Did you forget to change your player "
                      " id/secret in '%s'?" % ConfigFile, file=sys.stderr)

            return int(id_), secret

    except FileNotFoundError:
        print("ERROR: Could not find '%s'. "
              "Did you forget to rename '%s' to '%s'?" %
              (ConfigFile, DefaultConfigFile, ConfigFile), file=sys.stderr)
        exit(1)


if __name__ == "__main__":
    main()
