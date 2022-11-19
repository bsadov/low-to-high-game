let newBtn = document.getElementById("new")
let gameBoard = document.getElementById("gameboard");
let numInput = document.getElementById("input");
let referenceArray = [], content = [];
let score, level;


/* for(let i=0; i <= 15; i++){
    referenceArray[i] = document.getElementById("sq"+i);
} */

newGame();

function newGame(){
    gameBoard.replaceChildren();
    let level = 4;
    let round = 1;
    let rows = 2;
    let boxes = numInput.value/2;

    if(numInput.value == 9){
        rows = 3;
        boxes = numInput.value/3;
    }
    else if(numInput.value >= 10){
        rows = 4;
        boxes = numInput.value/4;
    }

    generateNumbers(Number(numInput.value));
    shuffleArray(content);
    generateBoard(rows, boxes);
    fillBoxes(content);
}


function generateBoard(numRows, numBoxes){
    let boxIndex = 0;
    for(i=0; i < numRows; i++){
        let newEle = document.createElement('div');
        newEle.setAttribute("class", "row");
        newEle.setAttribute("id", "row"+i);
        gameBoard.append(newEle);
        if(numBoxes){
            for(j=0; j < numBoxes; j++){
                let newEle = document.createElement('div');
                newEle.setAttribute("class", "box");
                newEle.setAttribute("id", "box"+boxIndex);
                document.getElementById('row'+i).append(newEle);
                referenceArray[boxIndex] = document.getElementById("box"+boxIndex);
                referenceArray[boxIndex].addEventListener("click", function(e){isLowest(Number(this.textContent))});
                boxIndex++;
            }
        }
    }
}

function isLowest(number){
    if(number == Math.min(...content)){
        content = content.filter(e => e !== number);
        console.log('isLowest Ran, new array is '+content);
        isCorrect();
    }
    else{
        isIncorrect();
    }
}

function isCorrect(){

}

function isIncorrect(){
    level--
}

function generateNumbers(number){
    content = [...Array(number+1).keys()].slice(1);
    console.log(content);
    /* content.fill(null, number, content.length) */
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function fillBoxes(array){
    for (let i = 0; i <= array.length-1; i++){
        referenceArray[i].textContent = array[i];
        /* console.log(referenceArray[i].textContent); */
    }
}