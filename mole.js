let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let difficultySpeed = 2000;
let moleInterval;
let highscore = localStorage.getItem("highscore") || 0;
window.onload = function () {
  setGame();
};

function setGame() {
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener('click', selectTile);
    document.getElementById("board").appendChild(tile);
  }
    

  startMoleInterval();
  setInterval(setPlant, 1000);
}

function startMoleInterval(){

  if(moleInterval) clearInterval(moleInterval);
  moleInterval = setInterval(setMole, difficultySpeed);
}

function setDifficulty(x){
    difficultySpeed = x;
    startMoleInterval();
}

function getRandomTile() {
  return Math.floor(Math.random() * 9).toString();
}

function setMole() {
    if(gameOver){
        return;
    }
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }
  let mole = document.createElement("img");
  mole.src = "mole.png";

  let num = getRandomTile();
  if(currPlantTile && currPlantTile.id == num) {
    return;
  }
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setPlant() {
    if(gameOver){
        return;
    }
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }
  let plant = document.createElement("img");
  plant.src = "plant.png";
 

  let num = getRandomTile();
    if(currMoleTile && currMoleTile.id == num) {
        return;
    }
  currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile(){
    if(gameOver){
        return;
    }
    if(this == currMoleTile){
        score +=10;
        document.getElementById("score").innerText = score.toString();
    }else if(this == currPlantTile){
        gameOver = !gameOver;
        if(score > highscore){
            highscore = score;
            localStorage.setItem("highscore", highscore);
        }
        document.getElementById("score").innerText = `GAME OVER ${score}, HighScore: ${highscore}`;
    }
}
