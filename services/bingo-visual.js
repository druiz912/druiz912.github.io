let usedCards = [];
let timerId;
let roundCount = 0;
let totalRounds;
let isPaused = false;

let showContent;
let stopTime;

document.addEventListener("DOMContentLoaded", (event) => {
  function hideContent() {
    document.getElementById("roundTimeDiv").style.display = "none";
    document.getElementById("cardsNumberDiv").style.display = "none";
    document.getElementById("input-container").style.display = "none";
  }

  function updateRoundsLeft() {
    document.getElementById("roundsLeft").textContent =
      totalRounds - roundCount;
  }

  showContent = function () {
    document.getElementById("content").style.display = "ruby-text";
    document.getElementById("images").style.display = "flex";
    document.getElementById("generateButton").style.display = "none";
  };

  stopTime = function () {
    isPaused = true;
    clearInterval(timerId);
    document.getElementById("generateButton").textContent = "Reanudar ronda";
  };

  function restartGame() {
    isPaused = false;
    usedCards = [];
    roundCount = 0;
    document.getElementById("images").innerHTML = "";
    generateImages();
    showContent();
  }

  function generateImages() {
    if (!isPaused) {
      const imagesDiv = document.getElementById("images");
      imagesDiv.innerHTML = "";

      const roundTime = document.getElementById("roundTime").value;
      const cardsNumber = document.getElementById("cardsNumber").value;

      totalRounds = Math.ceil(63 / cardsNumber);
      updateRoundsLeft();

      hideContent();

      for (let i = 0; i < cardsNumber; i++) {
        let randomNumber;
        do {
          randomNumber = Math.floor(Math.random() * 63) + 1;
        } while (usedCards.includes(randomNumber));
        usedCards.push(randomNumber);

        const img = document.createElement("img");
        img.src = `druiz912.github.io/assets/bingo-visual/card-${randomNumber}.PNG`;
        imagesDiv.appendChild(img);
      }

      startTimer(roundTime);
      clearImagesAfterTime(roundTime, imagesDiv);
    }
  }

  function startTimer(roundTime) {
    let timeLeft = roundTime;
    document.getElementById("timeLeft").textContent = timeLeft;
    timerId = setInterval(() => {
      timeLeft--;
      document.getElementById("timeLeft").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerId);
      }
    }, 1000);
  }

  function clearImagesAfterTime(roundTime, imagesDiv) {
    setTimeout(() => {
      imagesDiv.innerHTML = "";
      clearInterval(timerId);
      if (usedCards.length >= 63) {
        usedCards = []; // Reiniciar las cartas usadas si ya se han usado todas
        roundCount = 0; // Reiniciar el contador de rondas
      }
      roundCount++;
      updateRoundsLeft();
      if (roundCount < totalRounds) {
        generateImages(); // Generar nuevas imágenes si aún no se han completado todas las rondas
      }
    }, roundTime * 1000);
  }
  document
    .getElementById("generateButton")
    .addEventListener("click", restartGame);

  document.getElementById("stopTimeButton").addEventListener("click", stopTime);
});
