// Asegúrate de que el DOM está completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function () {
  const audioFiles = [
    "cabra.mp3",
    "gallo.mp3",
    "pajaro.mp3",
    "vaca.mp3",
    "rana.mp3",
    "pato.mp3",
    "perro.mp3",
    "gato.mp3",
    "cerdo.mp3",
  ];

  const startBtn = document.getElementById("start-btn");
  const audioBtn = document.getElementById("audio-btn");
  const timeBtn = document.getElementById("time-btn");
  const imgElement = document.getElementById("animal-img");
  const audioElement = document.getElementById("animal-audio");

  let isGameStarted = false;
  let currentAnimalIndex = 0;
  let timer;
  const playedAnimalIndices = new Set();

  window.startGame = function (event) {
    event.preventDefault();

    if (!isGameStarted) {
      isGameStarted = true;
      currentAnimalIndex = getRandomIndex();
      print("Se va a empezar por el número: " + currentAnimalIndex.toString());
      startBtn.style.display = "none";
      timeBtn.style.display = "block";
      loadNextAnimal();
    } else {
      clearTimeout(timer);
      checkAnswer(event);
    }
  };

  function getRandomIndex() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * audioFiles.length);
    } while (playedAnimalIndices.has(randomIndex));
    playedAnimalIndices.add(randomIndex);
    return randomIndex;
  }

  function loadNextAnimal() {
    imgElement.src = "./assets/incognit.jpg";
    const audioFileName = audioFiles[currentAnimalIndex];
    audioElement.src = `./assets/audios/${audioFileName}`;
    audioElement.load();

    audioElement.addEventListener(
      "canplaythrough",
      function onCanPlayThrough() {
        audioElement.removeEventListener("canplaythrough", onCanPlayThrough);
        audioElement.play();
        audioBtn.style.display = "block";
      }
    );

    // Cambiar la imagen cuando comienza la carga del audio
    audioElement.addEventListener("loadstart", function onLoadStart() {
      audioElement.removeEventListener("loadstart", onLoadStart);
      imgElement.src = "./assets/incognit.jpg";
    });
  }

  window.playAudio = function (event) {
    event.preventDefault();
    audioElement.currentTime = 0;
    audioElement.play();
  };

  window.checkAnswer = function (event) {
    event.preventDefault();
    audioElement.pause();
    const audioFileName = audioFiles[currentAnimalIndex];
    const animalName = audioFileName.split(".")[0];
    const imagePath = `./assets/audios/${animalName}.png`;

    imgElement.src = imagePath;
    audioBtn.disabled = true;

    if (currentAnimalIndex < audioFiles.length - 1) {
      currentAnimalIndex++;
      setTimeout(() => {
        audioBtn.disabled = false;
        loadNextAnimal();
      }, 2000);
    } else {
      alert("¡Juego terminado!");
      resetGame();
    }
  };

  function resetGame() {
    playedAnimalIndices.clear();
    isGameStarted = false;
    currentAnimalIndex = 0;
    startBtn.style.display = "block";
    timeBtn.style.display = "none";
    imgElement.src = "./assets/portada-game-audio.jpg";
  }

  // Asigna eventos a los botones
  startBtn.addEventListener("click", startGame);
  audioBtn.addEventListener("click", playAudio);
  timeBtn.addEventListener("click", checkAnswer);
});
