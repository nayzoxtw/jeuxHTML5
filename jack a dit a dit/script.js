const colors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let clickCount = 0;
let gameStarted = false;

document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    level = 0;
    gamePattern = [];
    userPattern = [];
    clickCount = 0;
    document.getElementById("status").textContent = `Level ${level}`;
    document.getElementById("click-count").textContent = clickCount;
    
    showMyTexts();
    nextSequence();
  }
}

function nextSequence() {
  userPattern = [];
  clickCount = 0;
  document.getElementById("click-count").textContent = clickCount;
  level++;
  document.getElementById("status").textContent = `Level ${level}`;

  // Réinitialise l'affichage de la séquence à chaque niveau
  document.getElementById("sequence-display").textContent = "-";

  // Ajoute une couleur aléatoire au motif du jeu
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gamePattern.push(randomColor);

  animateSequence();
}

function animateSequence() {
  let i = 0;
  const interval = setInterval(() => {
    flashButton(gamePattern[i]);
    i++;
    if (i === gamePattern.length) {
      clearInterval(interval);
      enableUserInput();
    }
  }, 600);
}

function flashButton(color) {
  const button = document.getElementById(color);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 300);
}

function enableUserInput() {
  colors.forEach((color) => {
    document.getElementById(color).addEventListener("click", handleUserClick);
  });
}

function disableUserInput() {
  colors.forEach((color) => {
    document.getElementById(color).removeEventListener("click", handleUserClick);
  });
}

function handleUserClick(event) {
  const clickedColor = event.target.id;
  userPattern.push(clickedColor);
  flashButton(clickedColor);
  clickCount++;
  document.getElementById("click-count").textContent = clickCount;

  // Affiche la séquence entrée par l'utilisateur avec les couleurs correspondantes
  const sequenceDisplay = document.getElementById("sequence-display");
  sequenceDisplay.innerHTML = "";
  userPattern.forEach((color) => {
    const span = document.createElement("span");
    span.style.color = color;
    span.textContent = color.toUpperCase() + " ";
    sequenceDisplay.appendChild(span);
  });

  checkAnswer(userPattern.length - 1);
}

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      disableUserInput();
      setTimeout(() => {
        showCongratsMessage();
        setTimeout(() => {
          hideCongratsMessage();
          nextSequence();
        }, 2000);
      }, 1000);
    }
  } else {
    document.getElementById("status").textContent = `Game Over!`;
    showLoseMessage();
    setTimeout(() => {
      hideLoseMessage();
    }, 2000);

    gameStarted = false;
    
    // Réinitialise le jeu après une courte pause
    setTimeout(() => {
      level = 0;
      gamePattern = [];
      document.getElementById("sequence-display").textContent = "-";
      document.getElementById("click-count").textContent = 0;
    }, 1500);
  }
}

function showCongratsMessage() {
  const message = `Congrats! You passed level ${level}!`;
  const congratsMessageElement = document.getElementById("level-message");
  congratsMessageElement.textContent = message;
  congratsMessageElement.style.display = "block";
  setTimeout(() => {
    congratsMessageElement.classList.add("show");
  }, 50);
}

function hideCongratsMessage() {
  const congratsMessageElement = document.getElementById("level-message");
  congratsMessageElement.classList.remove("show");
  setTimeout(() => {
    congratsMessageElement.style.display = "none";
  }, 1000);
}

function showLoseMessage() {
  const message = `Game Over! Correct color was ${gamePattern[userPattern.length - 1]}.`;
  const loseMessageElement = document.getElementById("level-message");
  loseMessageElement.textContent = message;
  loseMessageElement.style.color = "red";
  loseMessageElement.style.display = "block";
  setTimeout(() => {
    loseMessageElement.classList.add("show");
  }, 50);
}

function hideLoseMessage() {
  const loseMessageElement = document.getElementById("level-message");
  loseMessageElement.classList.remove("show");
  setTimeout(() => {
    loseMessageElement.style.display = "none";
  }, 1000);
}

function showMyTexts() {
  const texts = document.getElementsByClassName("my-text");
  for (let i = 0; i < texts.length; i++) {
    texts[i].style.display = "block";
    texts[i].classList.add("show");
  }
}

function hideMyTexts() {
  const texts = document.getElementsByClassName("my-text");
  for (let i = 0; i < texts.length; i++) {
    texts[i].classList.remove("show");
    texts[i].style.display = "none";
  }
}
