const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]


]
//create a function to initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //initialise box with css properties once again
        box.classList =`box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;; 
}
initGame();

function swapTurn(){
    if(currentPlayer =="X"){
        currentPlayer ="O"; 
    }
    else{
        currentPlayer = "X";
    }
    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function checkGameOver(){
    let winner = "";  // Initialize winner
    
    winningPositions.forEach((position) => {
        if (
            gameGrid[position[0]] !== "" &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[1]] === gameGrid[position[2]]
        ) {
            // Set winner as X or O
            winner = gameGrid[position[0]];

            // Disable pointer events after win
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // Add win style to the winning boxes
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // If there is a winner
    if (winner !== "") {
        gameInfo.innerText = `Winner Player - ${winner}`;  // Correctly display the winner
        newGameBtn.classList.add("active");
        return;
    }
    //when there is no winner(tie)
    let fillCount =0;
    gameGrid.forEach((box) =>{
        if(box !== "")
            fillCount++
    }

    );
    if(fillCount==9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

    


}

function handleClick(index){
    if(gameGrid[index] == ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn wise
        swapTurn();
        //check if player already won
        checkGameOver();
    
    } 
}
//clickEventListner
boxes.forEach((box, index) => {                           
    box.addEventListener("click", ()=>{
        handleClick(index);                       //if cell empty,insert current player val
    })
});

newGameBtn.addEventListener("click", initGame);
