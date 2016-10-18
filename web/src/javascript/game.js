import {
  drawFoodOnMap,
  drawMap,
  drawMiniMap,
  drawPlayersOnMap,
  initMap,
} from "./drawMap";

const apiURL = "http://localhost:1337/api/1/game/";

export function draw(gameState, canvas) {
  initMap(canvas);
  drawFoodOnMap(gameState.food, canvas);
  drawPlayersOnMap(gameState.players, canvas);
  drawMap(canvas);
  drawMiniMap(canvas);
}

export function fetchState(gameId) {
  return fetch(`${apiURL}${gameId}`, {method: "get"})
    .then(response => {
      return response.json();
    })
    .then(response => {
      return response.data;
    });
}