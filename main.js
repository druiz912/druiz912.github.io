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

const path = "./assets/audios/";
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
const respuestaImgElement = document.getElementById("respuesta-img");

let audioElement;
let currentAnimalIndex;
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
    // Obtén un número aleatorio para seleccionar un animal
    currentAnimalIndex = Math.floor(Math.random() * audioFiles.length);
  } while (listaSinDuplicados.has(currentAnimalIndex)); // Mientras en el set haya 'currentAnimalIndex'

  listaSinDuplicados.add(currentAnimalIndex);
  console.log("Lista de duplicados:", Array.from(listaSinDuplicados));

  // Establece la fuente del audio
  audioSource = path + audioFiles[currentAnimalIndex];
  console.log("El audio a reproducir:", audioSource);
  console.log("El numero[INDEX] generado es: ", currentAnimalIndex);

  // Mostramos la imagen de incógnita
  showElement(imgElement, "block");

  // Crea un nuevo elemento de audio y comienza la reproducción
  audioElement = new Audio(audioSource);
  audioElement.play();

  // Mostrar imagen de ronda
  imgElement.src = "./assets/incognit.jpg";

  // Muestra el botón de "Tiempo"
  showElement(timeBtn, "block");
  // Muestra el botón de "Audio"
  showElement(audioBtn, "block");

  // Verifica si se han agotado todos los índices
  if (listaSinDuplicados.size === audioFiles.length) {
    alert("¡Has completado todos los audios!");
    // Puedes realizar otras acciones aquí según tu necesidad
  }
});

document.getElementById("time-btn").addEventListener("click", function () {
  // Detén la reproducción del audio
  audioElement.pause();

  // Ocultamos la imagen de incógnita
  hideElement(imgElement);

  // Ponemos visible la imagen de respuesta
  showElement(respuestaImgElement, "block");
  // Establece la imagen de respuesta
  respuestaImgElement.src =
    path + audioFiles[currentAnimalIndex].replace(".mp3", ".png");
  console.log(respuestaImgElement.src);
  // Oculta el botón de "Audio"
  document.getElementById("audio-btn").style.display = "none";
  // Oculta el botón de "Audio"
  hideElement(audioBtn);
  startBtn.textContent = "¡Otra vez!";
  showElement(startBtn, "block");
  hideElement(timeBtn);
});

document.getElementById("audio-btn").addEventListener("click", function () {
  // Cambiar el texto del botón y gestionar la pausa/reanudación
  if (!audioPaused) {
    // Cambia el texto del botón
    // Actualiza el texto del botón
    toggleAudioButton();
    // Detén la reproducción del audio
    audioElement.pause();
  } else {
    // Cambia el texto del botón
    // Actualiza el texto del botón
    toggleAudioButton();
    // Reanuda la reproducción del audio
    audioElement.play();
  }
  // Invierte el estado de pausa
  audioPaused = !audioPaused;
});
