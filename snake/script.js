const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// On récupère le score le plus élevé de la mémoire (localStorage, quoi)
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {
    // Le repaire secret de la nourriture, aléatoire et tout ça
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    // Si tu perds, on arrête tout et on te le dit, voilà !
    clearInterval(setIntervalId);
    alert("Game Over! Appuie sur OK pour recommencer...");
    location.reload();
}

const changeDirection = e => {
    // Quand tu appuies sur les touches, on change la direction de la bestiole
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Quand tu cliques sur les boutons, on change la direction avec un petit coup de pouce
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Si le serpent mange la nourriture, c'est le moment de se régaler
    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); // On ajoute la nourriture à la longue liste du serpent
        score++; // Un petit point en plus
        highScore = score >= highScore ? score : highScore; // On garde la meilleure performance
        localStorage.setItem("high-score", highScore); // On n'oublie pas de sauvegarder
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    // On déplace le serpent selon sa vitesse actuelle
    snakeX += velocityX;
    snakeY += velocityY;
    
    // Le serpent bouge, chaque partie de son corps suit
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; // La tête du serpent va là où elle veut bien

    // Si le serpent touche un mur, c'est la fin des haricots
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // On affiche chaque morceau du serpent
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // Si la tête rencontre le corps, c'est aussi la fin de l'histoire
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);
