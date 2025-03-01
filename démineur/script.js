let board = [];
let rows = 8;
let columns = 8;

let minesCount = 10;
let minesLocation = []; // "2-2", "3-4", "2-1"

let tilesClicked = 0; // objectif : cliquer sur toutes les cases sauf celles contenant des mines
let flagEnabled = false;

let gameOver = false;

window.onload = function () {
  startGame();
};

function setMines() {
  // minesLocation.push("2-2");
  // minesLocation.push("2-3");
  // minesLocation.push("5-6");
  // minesLocation.push("3-4");
  // minesLocation.push("1-1");

  let minesLeft = minesCount;
  while (minesLeft > 0) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    let id = r.toString() + "-" + c.toString();

    if (!minesLocation.includes(id)) {
      minesLocation.push(id);
      minesLeft -= 1;
    }
  }
}

function startGame() {
  document.getElementById("mines-count").innerText = minesCount;
  document.getElementById("flag-button").addEventListener("click", setFlag);
  setMines();

  // Remplir notre plateau
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      //<div id="0-0"></div>
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.addEventListener("click", clickTile);
      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }

  console.log(board);
}

function setFlag() {
  if (flagEnabled) {
    flagEnabled = false;
    document.getElementById("flag-button").style.backgroundColor = "lightgray";
  } else {
    flagEnabled = true;
    document.getElementById("flag-button").style.backgroundColor = "darkgray";
  }
}

function clickTile() {
  if (gameOver || this.classList.contains("tile-clicked")) {
    return;
  }

  let tile = this;
  if (flagEnabled) {
    if (tile.innerText == "") {
      tile.innerText = "🚩";
    } else if (tile.innerText == "🚩") {
      tile.innerText = "";
    }
    return;
  }

  if (minesLocation.includes(tile.id)) {
    // alert("GAME OVER");
    gameOver = true;
    revealMines();
    return;
  }

  let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  checkMine(r, c);
}

function revealMines() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = board[r][c];
      if (minesLocation.includes(tile.id)) {
        tile.innerText = "💣";
        tile.style.backgroundColor = "red";
      }
    }
  }
}

function checkMine(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return;
  }
  if (board[r][c].classList.contains("tile-clicked")) {
    return;
  }

  board[r][c].classList.add("tile-clicked");
  tilesClicked += 1;

  let minesFound = 0;

  //haut 3
  minesFound += checkTile(r - 1, c - 1); //haut gauche
  minesFound += checkTile(r - 1, c); //haut
  minesFound += checkTile(r - 1, c + 1); //haut droite

  //gauche et droite
  minesFound += checkTile(r, c - 1); //gauche
  minesFound += checkTile(r, c + 1); //droite

  //bas 3
  minesFound += checkTile(r + 1, c - 1); //bas gauche
  minesFound += checkTile(r + 1, c); //bas
  minesFound += checkTile(r + 1, c + 1); //bas droite

  if (minesFound > 0) {
    board[r][c].innerText = minesFound;
    board[r][c].classList.add("x" + minesFound.toString());
  } else {
    board[r][c].innerText = "";

    //haut 3
    checkMine(r - 1, c - 1); //haut gauche
    checkMine(r - 1, c); //haut
    checkMine(r - 1, c + 1); //haut droite

    //gauche et droite
    checkMine(r, c - 1); //gauche
    checkMine(r, c + 1); //droite

    //bas 3
    checkMine(r + 1, c - 1); //bas gauche
    checkMine(r + 1, c); //bas
    checkMine(r + 1, c + 1); //bas droite
  }

  if (tilesClicked == rows * columns - minesCount) {
    document.getElementById("mines-count").innerText = "Nettoyé";
    gameOver = true;
  }
}

function checkTile(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return 0;
  }
  if (minesLocation.includes(r.toString() + "-" + c.toString())) {
    return 1;
  }
  return 0;
}
