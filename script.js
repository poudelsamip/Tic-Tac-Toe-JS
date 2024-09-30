const boxes = document.querySelectorAll(".box");
const gamestatus = document.querySelector("#game-status");
const restart = document.querySelector("button");
const scorex = document.querySelector("#xscorespan");
const scoreo = document.querySelector("#oscorespan");


const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let playerPosition = Array(9).fill("");
let gameRunning = true;
let xpoints = 0;
let opoints = 0;
let count = 0;
let currentPlayer = count%2==0 ? "X" : "O";
gamestatus.innerText =`${currentPlayer} Turn`;

function restartgame(){
    playerPosition.fill("")
    currentPlayer = count%2==0 ? "X" : "O";
    gamestatus.innerText =`${currentPlayer} Turn`;
    boxes.forEach( cell => cell.innerText = "");
    gameRunning = true;
}

function checkWin(){
    for(let pos of winCondition){
        if(playerPosition[pos[0]] == currentPlayer && playerPosition[pos[1]] == currentPlayer && playerPosition[pos[2]] == currentPlayer){
            return "win";
        }
    }
    if(!playerPosition.includes("")) return "draw";
    return "continue";
}

function updateScore(){
    currentPlayer == "X" ? xpoints++ : opoints++;
    scorex.innerText = xpoints;
    scoreo.innerText = opoints;
}

function updateGameStatus(message){
    gamestatus.innerText = message;
    gameRunning = false;
    count++;
}

function placePlayer(cell, idx){
    if(gameRunning){
        if(playerPosition[idx] != "") return;
        playerPosition[idx] = currentPlayer;
        cell.innerText = currentPlayer;
        let result = checkWin();
        if(result == "win"){
            updateGameStatus(`${currentPlayer} won the game`);
            updateScore();
            return;
        }
        else if(result == "draw"){
            updateGameStatus("Game Draw");
            return;
        }
        else{
            currentPlayer = currentPlayer == "X" ? "O" : "X";
            gamestatus.innerText = `${currentPlayer} Turn`;
        }
    }
}

boxes.forEach((cell, idx) => {
    cell.addEventListener("click",() => placePlayer(cell, idx));
});

