let gameBoard = document.getElementById("gameboard");
let levelEle = document.getElementById("level");
let roundEle = document.getElementById("round");
let scoreEle = document.getElementById("score");
let referenceArray = [], content = [];
let level, round, score, rows, boxes;

function newGame(){
    level = 4;
    round = 1;
    score = 0;

    roundStart();
}

function roundStart(){
    gameBoard.replaceChildren();

    let newEle = document.createElement("h2");
    newEle.textContent = "Round: "+round;
    gameBoard.append(newEle);

    levelEle.textContent = level;
    roundEle.textContent = round;
    scoreEle.textContent = score;

    rows = 2;
    
    if(level == 9){
        rows = 3;
    }
    else if(level >= 10){
        rows = 4;
    }

    boxes = level/rows;

    setTimeout(()=> {
        gameBoard.replaceChildren()
        generateNumbers(level);
        shuffleArray(content);
        generateBoard(rows, boxes);
        fillBoxes();
        setTimeout(hideBoxes, 3000);
    }, 2000);
}

function generateBoard(numRows, numBoxes){
    let boxIndex = 0;
    for(i=0; i < numRows; i++){
        let newEle = document.createElement("div");
        newEle.setAttribute("class", "row");
        newEle.setAttribute("id", "row"+i);
        gameBoard.append(newEle);
        if(numBoxes){
            for(j=0; j < numBoxes && boxIndex < level; j++){
                let newEle = document.createElement("div");
                newEle.setAttribute("class", "box");
                newEle.setAttribute("id", "box"+boxIndex);
                document.getElementById("row"+i).append(newEle);
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
    gameBoard.replaceChildren();
    let newEle = document.createElement("h2");
    newEle.textContent = "Correct!";
    newEle.style.color = "green";
    gameBoard.append(newEle);

    score += level;
    if(round == 10){
        return setTimeout(gameComplete, 1000);
    }
    round++;
    level = level<10 ? level+1 : level+2;

    setTimeout(roundStart, 1000);
}

function isIncorrect(){
    gameBoard.replaceChildren();
    let newEle = document.createElement("h2");
    newEle.textContent = "Incorrect!";
    newEle.style.color = "red";
    gameBoard.append(newEle);

    if(round == 10){
        return setTimeout(gameComplete, 1000);
    }
    round++;
    if(level !== 4){
        level = level<=10 ? level-1 : level-2;
    }

    setTimeout(roundStart, 1000);
}

function gameComplete(){
    levelEle.textContent = level;
    roundEle.textContent = round;
    scoreEle.textContent = score;

    gameBoard.replaceChildren();

    let newEle = document.createElement("h3");
    newEle.textContent = "GAME COMPLETE, SCORE: "+score+"\n Press to Play Again";
    gameBoard.append(newEle);

    newEle.addEventListener("click", newGame);
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
