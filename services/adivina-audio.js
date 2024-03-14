/**
 * Metodo para modificar el estilo del elemento y mostrarlo
 * @param {*} element
 */
function showElement(element, styleDisplay) {
  element.style.display = styleDisplay;
}

/**
 * Metodo para modificar el estilo del elemento y ocultarlo
 * @param {*} element
 */
function hideElement(element) {
  element.style.display = "none";
}

const path = "../assets/audios/";
const audioFiles = [
  "asieslavida.mp3",
  "cruelsummer.mp3",
  "Houdini.mp3",
  "madridcity.mp3",
  "miamor.mp3",
  "noseve.mp3",
  "vampire.mp3",
  "vocation.mp3",
  "yesand.mp3",
];

const startBtn = document.getElementById("start-btn");
const audioBtn = document.getElementById("audio-btn");
const timeBtn = document.getElementById("time-btn");
const imgElement = document.getElementById("main-image-game");
const respuestaImgElement = document.getElementById("img-response");

let audioElement;
let currentIndexAudio;
let audioSource;
let audioPaused = false;
let listaSinDuplicados = new Set();

/**
 * Metodo para cambiar el texto del boton de audio, segun si es true o false la variable audioPased
 */
function toggleAudioButton() {
  audioBtn.textContent = audioPaused ? "Pausar audio" : "Reanudar audio";
}

document.getElementById("start-btn").addEventListener("click", function () {
  hideElement(startBtn);
  showElement(timeBtn, "block");
  hideElement(respuestaImgElement);
  // Realiza
  do {
    // Obtén un número aleatorio para seleccionar un audio
    currentIndexAudio = Math.floor(Math.random() * audioFiles.length);
  } while (listaSinDuplicados.has(currentIndexAudio)); // Mientras en el set haya 'currentIndexAudio'

  listaSinDuplicados.add(currentIndexAudio);
  console.log("Lista de duplicados:", Array.from(listaSinDuplicados));
  audioSource = path + audioFiles[currentIndexAudio];
  console.log("El audio a reproducir:", audioSource);
  showElement(imgElement, "block");

  audioElement = new Audio(audioSource);
  audioElement.addEventListener("loadedmetadata", function() {
    audioElement.currentTime = Math.random() * audioElement.duration;
  
    let minutes = Math.floor(audioElement.currentTime / 60);
    let seconds = Math.floor(audioElement.currentTime % 60);

    console.log(`El tiempo de inicio de la canción es: ${minutes} minutos y ${seconds} segundos.`);
  });
  audioElement.play();
  imgElement.src = '../assets/thinking.jpg';
  showElement(timeBtn, "block");
  showElement(audioBtn, "block");
  if (listaSinDuplicados.size === audioFiles.length) {
    alert("¡Has completado todos los audios!");
  }
});

document.getElementById("time-btn").addEventListener("click", function () {
  audioElement.pause();
  hideElement(imgElement);
  showElement(respuestaImgElement, "block");
  respuestaImgElement.src =
    path + audioFiles[currentIndexAudio].replace(".mp3", ".jpg");
  console.log(respuestaImgElement.src);
  document.getElementById("audio-btn").style.display = "none";
  hideElement(audioBtn);
  startBtn.textContent = "¡Otra vez!";
  showElement(startBtn, "block");
  hideElement(timeBtn);
});

document.getElementById("audio-btn").addEventListener("click", function () {
  if (!audioPaused) {
    toggleAudioButton();
    audioElement.pause();
  } else {
    toggleAudioButton();
    audioElement.play();
  }
  audioPaused = !audioPaused;
});
