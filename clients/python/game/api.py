from requests import get

from .models import Game


class API:
    URL = "http://localhost:1337/api/1/game/"

    def __init__(self, team_secret):
        self.secret = team_secret

    def fetch_game_state(self, game_id):
        """
        Fetches the Game state for the given game ID.

        :param game_id: ID of a game
        :returns:       Game object
        """
        response = get(API.URL + str(game_id))
        data = self._extract_data(response)
        return Game.parse(data)

    def _extract_data(self, response):
        """
        Extracts the application data from a requests Response object.
        """
        return response.json()["data"]