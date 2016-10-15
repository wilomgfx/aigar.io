import $ from "jquery";

const screenCanvas = $("#screenCanvas")[0];
const screenContext = screenCanvas.getContext("2d");
const screenWidth = screenCanvas.width;
const screenHeight = screenCanvas.height;
//Static position for tests for the screen window on the mini-map
var xScreenPosOnMap = 200;
var yScreenPosOnMap = 200;

const mapCanvas = document.createElement("canvas");
const mapContext = mapCanvas.getContext("2d");
export const mapWidth = screenWidth*3;
export const mapHeight = screenHeight*3;

const miniMapCanvas = document.createElement("canvas");
const miniMapContext = miniMapCanvas.getContext("2d");
const miniMapWidth = screenWidth/4;
const miniMapHeight = screenHeight/4;
const miniMapPosX = screenWidth-miniMapWidth;

const miniMapScreenPosWidth = miniMapWidth/3;
const miniMapScreenPosHeight = miniMapHeight/3;

export function drawCellsOnMap(cells){
  //set dimensions
  mapCanvas.width = mapWidth;
  mapCanvas.height = mapHeight;

  for(let i = 0; i < cells.length; i += 1) {
    const cell = cells[i];

    mapContext.beginPath();
    mapContext.arc(cell.position.x, cell.position.y, cell.mass, 0, Math.PI * 2, false);
    mapContext.fillStyle = "#ed1515";
    mapContext.fill();
  }
}


export function drawMap(){
  screenContext.clearRect(0, 0, screenWidth, screenHeight);
  screenContext.drawImage(mapCanvas, xScreenPosOnMap, yScreenPosOnMap, screenWidth, screenHeight, 0, 0, screenWidth, screenHeight);
}
export function drawMiniMap() {
  miniMapContext.clearRect(0, 0, screenWidth, screenHeight);

  //set dimensions
  miniMapCanvas.width = screenWidth;
  miniMapCanvas.height = screenHeight;

  //MiniMap background
  miniMapContext.rect(0,0,miniMapWidth,miniMapHeight);
  miniMapContext.fillStyle = "rgba(58, 58, 58, 0.85)";
  miniMapContext.fill();

  //apply the old canvas to the new one
  miniMapContext.drawImage(mapCanvas, 0, 0, miniMapWidth, miniMapHeight);

  drawMiniMapminiMapScreenPos();

  screenContext.drawImage(miniMapCanvas, miniMapPosX,0);
  screenCanvas.style.background = "#000";
}

function drawMiniMapminiMapScreenPos(){
  miniMapContext.strokeStyle="#fff";
  var xMiniMapPos = miniMapWidth/mapWidth*xScreenPosOnMap;
  var yMiniMapPos = miniMapHeight/mapHeight*yScreenPosOnMap;
  miniMapContext.strokeRect(xMiniMapPos,yMiniMapPos,miniMapScreenPosWidth,miniMapScreenPosHeight);
}
