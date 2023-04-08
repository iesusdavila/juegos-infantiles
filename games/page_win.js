const playAgainBtn = document.querySelector(".play-again-btn");
const playSgtNivelBtn = document.querySelector(".play-sgt-nvl-btn");

const level = localStorage.getItem("nivelActual");

// Event listener para el botón de "Jugar de nuevo"
playAgainBtn.addEventListener("click", () => {
  const nextLevel = parseInt(level);
  const nextUrl = "../index.html?level=" + nextLevel;

  // Redirigir a la siguiente página del juego
  window.location.href = nextUrl;
});

playSgtNivelBtn.addEventListener("click", () => {
  const nextLevel = parseInt(level) + 1;
  const nextUrl = "../index.html?level=" + nextLevel;

  // Redirigir a la siguiente página del juego
  window.location.href = nextUrl;
});
