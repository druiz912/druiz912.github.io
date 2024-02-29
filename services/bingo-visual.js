// bingo-visual.js
document.addEventListener("DOMContentLoaded", (event) => {
  let usedCards = []; // Para almacenar las cartas ya usadas
  let timerId; // Para almacenar el ID del temporizador
  let roundCount = 0; // Para contar las rondas
  let totalRounds; // Para almacenar el número total de rondas

  function generateImages() {
    const imagesDiv = document.getElementById("images");
    imagesDiv.innerHTML = ""; // Limpiar las imágenes anteriores

    const roundTime = document.getElementById("roundTime").value;
    const cardsNumber = document.getElementById("cardsNumber").value;

    totalRounds = Math.ceil(63 / cardsNumber); // Calcular el número total de rondas
    document.getElementById("roundsLeft").textContent = totalRounds - roundCount;

    // Ocultar los divs una vez que el juego haya comenzado
    document.getElementById("roundTimeDiv").style.display = "none";
    document.getElementById("cardsNumberDiv").style.display = "none";

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

    // Iniciar el cronómetro
    let timeLeft = roundTime;
    document.getElementById("timeLeft").textContent = timeLeft;
    timerId = setInterval(() => {
      timeLeft--;
      document.getElementById("timeLeft").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerId);
      }
    }, 1000);

    // Limpiar las imágenes después del tiempo de la ronda
    setTimeout(() => {
      imagesDiv.innerHTML = "";
      clearInterval(timerId);
      if (usedCards.length >= 63) {
        usedCards = []; // Reiniciar las cartas usadas si ya se han usado todas
        roundCount = 0; // Reiniciar el contador de rondas
      }
      roundCount++;
      document.getElementById("roundsLeft").textContent =
        totalRounds - roundCount;
      if (roundCount < totalRounds) {
        generateImages(); // Generar nuevas imágenes si aún no se han completado todas las rondas
      }
    }, roundTime * 1000);
  }

  document
    .getElementById("generateButton")
    .addEventListener("click", generateImages);
});
