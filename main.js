// Asegúrate de que el DOM está completamente cargado antes de ejecutar el script

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
const timeBtn = document.getElementById("time-btn");

let isGameStarted = false;
let currentAnimalIndex = 0;
let timer;

function startGame() {
  if (!isGameStarted) {
    isGameStarted = true;
    currentAnimalIndex = getRandomIndex();
    startBtn.style.display = "none";
    timeBtn.style.display = "block";
    loadNextAnimal(currentAnimalIndex);
  } else {
    clearTimeout(timer);
    checkAnswer();
  }
}

function getRandomIndex() {
  return Math.floor(Math.random() * audioFiles.length);
}

function loadNextAnimal(currentAnimalIndex) {
  const audioElement = document.getElementById("animal-audio");
  const imgElement = document.getElementById("animal-img");

  imgElement.src = "./assets/incognit.jpg"; // Cambia a la imagen de pregunta
  const audioFileName = audioFiles[currentAnimalIndex];
  audioElement.src = `./assets/audios/${audioFileName}`; // Ruta completa del archivo de audio
  audioElement.load();
  audioElement.play();
  timer = setTimeout(() => {
    checkAnswer(currentAnimalIndex);
  }, audioElement.duration * 1000); // Espera hasta que termine el audio
}

function playAudio() {
  const audioElement = document.getElementById("animal-audio");
  audioElement.currentTime = 0;
  audioElement.play();
}

function checkAnswer(currentAnimalIndex) {
  const audioElement = document.getElementById("animal-audio");
  const imgElement = document.getElementById("animal-img");

  const audioFileName = audioFiles[currentAnimalIndex];
  const animalName = audioFileName.split(".")[0]; // Elimina la extensión del archivo
  const imagePath = `./assets/animales/${animalName}.png`; // Ruta de la imagen en la carpeta de animales

  imgElement.src = imagePath; // Cambia a la imagen correspondiente al animal

  // Reinicia el juego si hay más animales, de lo contrario, muestra un mensaje de fin de juego
  if (currentAnimalIndex < audioFiles.length - 1) {
    let newIndex = currentAnimalIndex + 1; // Corregir esta línea
    setTimeout(() => {
      loadNextAnimal(newIndex);
    }, 2000); // Espera 2 segundos antes de cargar el siguiente animal
  } else {
    alert("¡Juego terminado!");
    resetGame();
  }
}

function resetGame() {
  isGameStarted = false;
  currentAnimalIndex = 0;
  startBtn.style.display = "block";
  timeBtn.style.display = "none";
  document.getElementById("animal-img").src = "./assets/game-audio-animal.jpg";
}
