let newBtn = document.getElementById("new")
let gameBoard = document.getElementById("gameboard");
let levelEle = document.getElementById("level");
let roundEle = document.getElementById("round");
let scoreEle = document.getElementById("score");
let referenceArray = [], content = [];
let level, round, score, rows, boxes;

newGame();

function newGame(){
    level = 4;
    round = 1;
    score = 0;

    roundStart();
}

function roundStart(){
    gameBoard.replaceChildren();

    levelEle.textContent = level;
    roundEle.textContent = round;
    scoreEle.textContent = score;

    rows = 2;
    boxes = level/2;

    if(level == 9){
        rows = 3;
        boxes = level/3;
    }
    else if(level >= 10){
        rows = 4;
        boxes = level/4;
    }

    generateNumbers(level);
    shuffleArray(content);
    generateBoard(rows, boxes);
    fillBoxes();
    setTimeout(hideBoxes, 3000);
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
                boxIndex++;
            }
        }
    }
}

function isLowest(event){
    let target = event.target;
    let number = Number(target.textContent);
    target.removeEventListener("click", isLowest);

    if(number == Math.min(...content)){
        content = content.filter(e => e !== number);
        target.style.backgroundColor = "white";
        target.style.border = "1px solid black";
        if(content.length == 0){
            return isCorrect();
        }
    }
    else{
        return isIncorrect();
    }
}

function isCorrect(){
    score += level;
    if(round == 10){
        gameComplete();
        return
    }
    round++;
    level = level<10 ? level+1 : level+2;

    roundStart();
}

function isIncorrect(){
    if(round == 10){
        gameComplete();
        return
    }
    round++;
    if(level !== 4){
        level = level<10 ? level-1 : level-2;
    }

    roundStart();
}

function gameComplete(){
    levelEle.textContent = level;
    roundEle.textContent = round;
    scoreEle.textContent = score;

    gameBoard.replaceChildren();

    let newEle = document.createElement('h1');
    newEle.textContent = 'GAME COMPLETE, SCORE: '+score;

    gameBoard.append(newEle);
}

function generateNumbers(number){
    content = [...Array(number+1).keys()].slice(1);
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function fillBoxes(){
    for (let i = 0; i <= content.length-1; i++){
        referenceArray[i].textContent = content[i];
    }
}

function hideBoxes(){
    for (let i = 0; i <= content.length-1; i++){
        referenceArray[i].style.backgroundColor = "black";
        referenceArray[i].style.border = "1px solid white";
        referenceArray[i].addEventListener("click", isLowest);
    }
}
