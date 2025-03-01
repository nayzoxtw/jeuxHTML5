const inputEl = document.querySelector("input");
const guessEl = document.querySelector(".guess");
const checkBtnEl = document.querySelector("button");
const remainingChancesTextEl = document.querySelector(".chances");
const remainingChancesEl = document.querySelector(".chance");

let randomNumber = Math.floor(Math.random() * 100);

totalChances = 10;

checkBtnEl.addEventListener("click", () => {
    
    totalChances--;
    let inputValue = inputEl.value;
   
    if (totalChances === 0) {
        inputValue = "";
        inputEl.disabled = true;
        guessEl.textContent = "Oups...! Pas de chance😥, vous avez perdu la partie.";
        guessEl.style.color = "red";
        checkBtnEl.textContent = "Rejouer...😉";
        remainingChancesTextEl.textContent = "Plus aucune chance restante";
    }
    else if (totalChances < 0) {
        window.location.reload();
    }
    else if (inputValue == randomNumber) {
        inputEl.disabled = true;
        guessEl.textContent = "Hourra...! Félicitations😍, vous avez gagné la partie.";
        guessEl.style.color = "green";
        checkBtnEl.textContent = "Rejouer...😉";
        totalChances = 0;
    } else if (inputValue > randomNumber && inputValue < 100) {
        guessEl.textContent = "Votre estimation est trop haute👍.";
        remainingChancesEl.textContent = totalChances;
        guessEl.style.color = "#1446a0";
    } else if (inputValue < randomNumber && inputValue > 0) {
        guessEl.textContent = "Votre estimation est trop basse👎.";
        remainingChancesEl.textContent = totalChances;
        guessEl.style.color = "#1446a0";
    } else {
        guessEl.textContent = "Votre nombre est invalide.";
        remainingChancesEl.textContent = totalChances;
        guessEl.style.color = "red";
    }
});
