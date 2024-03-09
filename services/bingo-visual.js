// bingo-visual.js
let usedCards = []; // Para almacenar las cartas ya usadas
let timerId; // Para almacenar el ID del temporizador
let roundCount = 0; // Para contar las rondas
let totalRounds; // Para almacenar el número total de rondas
let isPaused = false; // Para controlar si el juego está en pausa

let showContent;
let stopTime;

document.addEventListener("DOMContentLoaded", (event) => {

  
  function hideContent() {
    document.getElementById("roundTimeDiv").style.display = "none";
    document.getElementById("cardsNumberDiv").style.display = "none";
    document.getElementById("input-container").style.display = "none";
  }
  
  function updateRoundsLeft() {
    document.getElementById("roundsLeft").textContent = totalRounds - roundCount;
  }
  
  showContent = function() {
    document.getElementById("content").style.display = "ruby-text";
    document.getElementById("images").style.display = "flex";
    document.getElementById("generateButton").style.display = "none"; // Ocultar el botón "Generar nuevas imágenes"
  }
  
  stopTime = function() {
    isPaused = true; // Pausar el juego
    clearInterval(timerId); // Detiene el temporizador
    document.getElementById("generateButton").textContent = "Reanudar ronda"; // Cambiar el texto del botón
  }
  
  function restartGame() {
    isPaused = false; // Reanudar el juego
    usedCards = []; // Reiniciar las cartas usadas
    roundCount = 0; // Reiniciar el contador de rondas
    document.getElementById("images").innerHTML = ""; // Limpiar las imágenes
    generateImages();
    showContent();
  }
  
  function generateImages() {
    if (!isPaused) {
      const imagesDiv = document.getElementById("images");
      imagesDiv.innerHTML = ""; // Limpiar las imágenes anteriores
  
      const roundTime = document.getElementById("roundTime").value;
      const cardsNumber = document.getElementById("cardsNumber").value;
  
      totalRounds = Math.ceil(63 / cardsNumber); // Calcular el número total de rondas
      updateRoundsLeft();
  
      hideContent();
  
      for (let i = 0; i < cardsNumber; i++) {
        let randomNumber;
        do {
          randomNumber = Math.floor(Math.random() * 63) + 1; // Generar un número aleatorio entre 1 y 63
        } while (usedCards.includes(randomNumber));
        usedCards.push(randomNumber);
  
        const img = document.createElement("img");
        img.src = `../assets/bingo-visual/card-${randomNumber}.png`; // Asumiendo que las imágenes son .png
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