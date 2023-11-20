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

  let isGameStarted = false;
  let currentAnimalIndex = 0;
  let timer;

  // Agrega el evento de envío del formulario para prevenir la recarga de la página
  document
    .getElementById("game-container")
    .addEventListener("submit", function (event) {
      event.preventDefault();
    });

  function startGame() {
    if (!isGameStarted) {
      isGameStarted = true;
      currentAnimalIndex = getRandomIndex();
      print("Se va a empezar x el numero: " + currentAnimalIndex.toString());
      startBtn.style.display = "none";
      timeBtn.style.display = "block";
      loadNextAnimal();
    } else {
      clearTimeout(timer);
      checkAnswer();
    }
  }

  function getRandomIndex() {
    return Math.floor(Math.random() * audioFiles.length);
  }

  function loadNextAnimal() {
    const audioElement = document.getElementById("animal-audio");
    const imgElement = document.getElementById("animal-img");

    imgElement.src = "./assets/incognit.jpg"; // Cambia a la imagen de pregunta
    const audioFileName = audioFiles[currentAnimalIndex];
    audioElement.src = `./assets/audios/${audioFileName}`; // Ruta completa del archivo de audio
    audioElement.load();
    audioElement.play();
    audioBtn.style.display = "block";
    // habria que revisar esto pq no da tiempo a que se escuche o vea la imagen
    timer = setTimeout(() => {
      checkAnswer();
    }, audioElement.duration * 10000); // Espera hasta que termine el audio
  }

  function playAudio() {
    const audioElement = document.getElementById("animal-audio");
    audioElement.currentTime = 0;
    audioElement.play();
  }

  function checkAnswer() {
    const audioElement = document.getElementById("animal-audio");
    const imgElement = document.getElementById("animal-img");

    // Pausa el audio antes de cambiar la imagen
    audioElement.pause();

    const audioFileName = audioFiles[currentAnimalIndex];
    print("checkAnswer: audioFileName: " + audioFileName);
    print("checkAnswer: audioElement: " + audioElement);
    const animalName = audioFileName.split(".")[0]; // Elimina la extensión del archivo
    print("checkAnswer: animalName: " + animalName);
    const imagePath = `./assets/audios/${animalName}.png`; // Ruta de la imagen en la carpeta de animales

    imgElement.src = imagePath; // Cambia a la imagen correspondiente al animal

    // Desactiva el botón durante la espera
    audioBtn.disabled = true;

    // Reinicia el juego si hay más animales, de lo contrario, muestra un mensaje de fin de juego
    if (currentAnimalIndex < audioFiles.length - 1) {
      currentAnimalIndex++; // Corregir esta línea
      setTimeout(() => {
        audioBtn.disabled = false;
      }, 6000); // Espera 2 segundos antes de cargar el siguiente animal
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
    document.getElementById("animal-img").src =
      "./assets/portada-game-audio.jpg";
  }
});
