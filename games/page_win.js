const winnerScreen = document.querySelector(".winner");
const playAgainBtn = document.querySelector(".play-again-btn");

// Función para mostrar la pantalla de ganador
function showWinnerScreen() {
  winnerScreen.style.display = "flex";
}

// Función para ocultar la pantalla de ganador
function hideWinnerScreen() {
  winnerScreen.style.display = "none";
}

// Event listener para el botón de "Jugar de nuevo"
playAgainBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});
