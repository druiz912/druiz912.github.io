// Agrega aquí los nombres de los archivos de audio correspondientes a cada animal
const audioFiles = [
  "cabra.mp3",
  "gallo.mp3",
  "pajaro.mp3",
  "vaca.mp3",
  "rana.mp3",
  "pato.mp3",
];

let currentAnimalIndex = 0;
let isGameStarted = false;
let timer;

function startGame() {
  if (!isGameStarted) {
    isGameStarted = true;
    document.getElementById("start-btn").innerText = "Tiempo";
    document.getElementById("time-btn").disabled = false;
    loadNextAnimal();
  } else {
    clearTimeout(timer);
    checkAnswer();
  }
}

function loadNextAnimal() {
  const imgElement = document.getElementById("animal-img");
  imgElement.src = "./assets/incognit.jpg"; // Cambia a la imagen de pregunta
  const audioElement = document.getElementById("animal-audio");
  audioElement.src = audioFiles[currentAnimalIndex];
  audioElement.load();
  audioElement.play();
  timer = setTimeout(() => {
    checkAnswer();
  }, audioElement.duration * 200); // Espera hasta que termine el audio
}

function playAudio() {
  const audioElement = document.getElementById("animal-audio");
  audioElement.currentTime = 0;
  audioElement.play();
}

function checkAnswer() {
  const imgElement = document.getElementById("animal-img");
  const audioFileName = audioFiles[currentAnimalIndex];
  const animalName = audioFileName.split(".")[0]; // Elimina la extensión del archivo
  const imagePath = `./assets/animales/${animalName}.png`; // Ruta de la imagen en la carpeta de animales

  imgElement.src = imagePath; // Cambia a la imagen correspondiente al animal

  // Reinicia el juego si hay más animales, de lo contrario, muestra un mensaje de fin de juego
  if (currentAnimalIndex < audioFiles.length - 1) {
    currentAnimalIndex++;
    setTimeout(() => {
      loadNextAnimal();
    }, 2000); // Espera 2 segundos antes de cargar el siguiente animal
  } else {
    alert("¡Juego terminado!");
    resetGame();
  }
}

function resetGame() {
  isGameStarted = false;
  currentAnimalIndex = 0;
  document.getElementById("start-btn").innerText = "Iniciar juego";
  document.getElementById("time-btn").disabled = true;
  const imgElement = document.getElementById("animal-img");
  imgElement.src = "./assets/game-audio-animal.jpg";
}
