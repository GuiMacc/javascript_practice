const timeDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector("#start-pause-button");
const gridWidth = 9;
let currentIndex = 76;
let timerID;
let currentTime = 15;
let gameStatus = true;
timeDisplay.innerHTML = currentTime;

function moveFrog(e) {
    squares[currentIndex].classList.remove("frog");

    switch(e.key){
        case 'ArrowLeft':
            if (currentIndex % gridWidth != 0) {
                currentIndex -= 1;
            }
            break;
        case 'ArrowRight':
            if (currentIndex % gridWidth != 8) {
            currentIndex += 1;
            }
            break;
        case 'ArrowUp':
            if (currentIndex >= gridWidth) {
            currentIndex -= gridWidth;
            }
            break;
        case 'ArrowDown':
            if (currentIndex + gridWidth < squares.length) {
            currentIndex += gridWidth;
            }
            break;
    }
    squares[currentIndex].classList.add("frog");
    check();
}

function frogger() {
    const grid = document.querySelector("#grid");

    let j =1;
    for (let i = 1; i <= 81; i++){
        const div = document.createElement("div")

        if (i == 5) {
            div.classList.add("ending-block")
        } else if(i > 18 && i <= 27) {
            div.classList.add("log-left")
            div.classList.add("l" + j)
            if (j>=5) j=0;
            j++;
        } else if(i > 27 && i <= 36) {
            div.classList.add("log-right")
            div.classList.add("l" + j)
            if (j>=5) j=0;
            j++;
        } else if(i > 45 && i <= 54) {
            if (i == 46) j = 1;
            div.classList.add("car-left")
            div.classList.add("c" + j)
            if (j == 3) j = 0;
            j++;
        }else if(i > 54 && i <= 63) {
            div.classList.add("car-right")
            div.classList.add("c" + j)
            if (j == 3) j=0;
            j++;
        } else if (i == 77) {
            div.classList.add("starting-block")
        }

        grid.append(div);
    }

}

function autoMoveLogs(){
    currentTime--;
    timeDisplay.innerHTML = currentTime;
    logsLeft.forEach((logLeft) => moveLogLeft(logLeft));   
    logsRight.forEach((logRight) => moveLogRight(logRight));
    carsLeft.forEach((carLeft) => moveCarLeft(carLeft));   
    carsRight.forEach((carRight) => moveCarRight(carRight));

    check();
}

function moveLogLeft(logLeft){
    switch(true){
        case logLeft.classList.contains("l1"):
            logLeft.classList.remove("l1");
            logLeft.classList.add("l2");
            break;
        case logLeft.classList.contains("l2"):
            logLeft.classList.remove("l2");
            logLeft.classList.add("l3");
            break;
        case logLeft.classList.contains("l3"):
            logLeft.classList.remove("l3");
            logLeft.classList.add("l4");
            break;
    case logLeft.classList.contains("l4"):
        logLeft.classList.remove("l4");
        logLeft.classList.add("l5");
        break;
    case logLeft.classList.contains("l5"):
        logLeft.classList.remove("l5");
        logLeft.classList.add("l1");
        break;
    }
}

function moveLogRight(logRight){
    switch(true){
        case logRight.classList.contains("l1"):
            logRight.classList.remove("l1");
            logRight.classList.add("l5");
            break;
        case logRight.classList.contains("l2"):
            logRight.classList.remove("l2");
            logRight.classList.add("l1");
            break;
        case logRight.classList.contains("l3"):
            logRight.classList.remove("l3");
            logRight.classList.add("l2");
            break;
    case logRight.classList.contains("l4"):
        logRight.classList.remove("l4");
        logRight.classList.add("l3");
        break;
    case logRight.classList.contains("l5"):
        logRight.classList.remove("l5");
        logRight.classList.add("l4");
        break;
    }
}

function moveCarLeft(carLeft){
    switch(true){
        case carLeft.classList.contains("c1"):
            carLeft.classList.remove("c1");
            carLeft.classList.add("c2");
            break;
        case carLeft.classList.contains("c2"):
            carLeft.classList.remove("c2");
            carLeft.classList.add("c3");
            break;
        case carLeft.classList.contains("c3"):
            carLeft.classList.remove("c3");
            carLeft.classList.add("c1");
            break;
    }
}

function moveCarRight(carRight){
    switch(true){
        case carRight.classList.contains("c1"):
            carRight.classList.remove("c1");
            carRight.classList.add("c3");
            break;
        case carRight.classList.contains("c2"):
            carRight.classList.remove("c2");
            carRight.classList.add("c1");
            break;
        case carRight.classList.contains("c3"):
            carRight.classList.remove("c3");
            carRight.classList.add("c2");
            break;
    }
}

function check() {
    if (squares[currentIndex].classList.contains("c1") ||
        squares[currentIndex].classList.contains("l1") ||
        squares[currentIndex].classList.contains("l2") ||
        squares[currentIndex].classList.contains("l3") ||
        currentTime <= 0
        ) {
        resultDisplay.innerHTML = "Perdeste!";
        clearInterval(timerID);
        squares[currentIndex].classList.add("frog-end");
        document.removeEventListener("keyup", moveFrog);
        gameStatus = false;
    } else if (squares[currentIndex].classList.contains("ending-block")) {
        resultDisplay.innerHTML = "Boa... GANHASTE!";
        clearInterval(timerID);
        document.removeEventListener("keyup", moveFrog);
        gameStatus = false;
    }
    
    if (!gameStatus) {
        startPauseButton.innerHTML = "RESTART GAME";
    }
}

startPauseButton,addEventListener("click", () => {
    if (timerID) {
        clearInterval(timerID);
        timerID = null;
        document.removeEventListener("keyup", moveFrog);
        startPauseButton.innerHTML = "Play";
    } else if (gameStatus) {
        timerID = setInterval(autoMoveLogs, 1000);
        document.addEventListener("keyup", moveFrog);
        startPauseButton.innerHTML = "Pause";
    }
    if (!gameStatus) {
        resetGame();
    }
})

function resetGame() {
    const grid = document.querySelector("#grid")
    grid.innerHTML = "";
    gameStatus = true;
    currentIndex = 76;
    startPauseButton.innerHTML = "Start";
    currentTime = 15;
    timeDisplay.innerHTML = currentTime;
    resultDisplay.innerHTML = "0";
    startFrogger();
}

function startFrogger() {
    frogger();
    squares = document.querySelectorAll("#grid div");
    squares[currentIndex].classList.add("frog");

    logsLeft = document.querySelectorAll("#grid .log-left");
    logsRight = document.querySelectorAll("#grid .log-right");
    carsLeft = document.querySelectorAll("#grid .car-left");
    carsRight = document.querySelectorAll("#grid .car-right");
    }

document.addEventListener("DOMContentLoaded", (event) => {
   startFrogger();
});