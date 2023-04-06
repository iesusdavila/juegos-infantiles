// Constantes
const cards = [
  { id: 1, value: "🍎" },
  { id: 2, value: "🍌" },
  { id: 3, value: "🍇" },
  { id: 4, value: "🍊" },
  { id: 5, value: "🥝" },
  { id: 6, value: "🍉" },
  { id: 7, value: "🍓" },
  { id: 8, value: "🍒" },
  { id: 9, value: "🍐" },
  { id: 10, value: "🥭" },
];

const board = document.querySelector(".board");
const resetButton = document.querySelector(".reset");

let cardsSelected = [];
let cardsMatched = [];

const foundList = document.querySelector(".found");
const remainingList = document.querySelector(".remaining");

function actualizarFrutasEncontradas() {
  const foundFruits = cardsMatched;

  foundList.innerHTML = "";
  foundFruits.forEach((fruit) => {
    foundList.innerHTML += `<li>${fruit}</li>`;
  });
}

function panelFrutas() {
  const remainingFruits = cards
    .filter((card) => !cardsMatched.includes(card.value))
    .map((card) => card.value);

  remainingList.innerHTML = "";

  remainingFruits.forEach((fruit) => {
    remainingList.innerHTML += `<li>${fruit}</li>`;
  });
}

// Función para crear cartas
function createCards() {
  // Duplicar cartas
  const cardPool = [...cards, ...cards];
  // Barajar cartas
  cardPool.sort(() => 0.5 - Math.random());
  // Crear elementos de carta y agregarlos al tablero
  cardPool.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = card.id;
    cardElement.innerHTML = `<span class="value">${card.value}</span>`;
    cardElement.addEventListener("click", handleCardClick);
    board.appendChild(cardElement);
  });
  panelFrutas();
}

// Función para manejar el clic en la carta
function handleCardClick() {
  // Si ya se han seleccionado dos cartas o la carta ya ha sido emparejada o se selecciono a la misma carta otra vez, salir de la función
  if (
    cardsSelected.length === 2 ||
    this.classList.contains("matched") ||
    this.classList.contains("selected")
  ) {
    return;
  }
  // Añadir la carta seleccionada al arreglo de cartas seleccionadas y cambiar su estilo
  cardsSelected.push(this);
  this.classList.add("selected");
  // Si se han seleccionado dos cartas, verificar si son iguales
  if (cardsSelected.length === 2) {
    const firstCardValue = cardsSelected[0].querySelector(".value").textContent;
    const secondCardValue =
      cardsSelected[1].querySelector(".value").textContent;
    if (firstCardValue === secondCardValue) {
      // Si las cartas son iguales, marcarlas como emparejadas y reiniciar el arreglo de cartas seleccionadas
      cardsSelected.forEach((card) => {
        card.classList.remove("selected");
        card.classList.add("matched");
        if (!cardsMatched.includes(firstCardValue)) {
          cardsMatched.push(firstCardValue);
          actualizarFrutasEncontradas();
        }
      });
      cardsSelected = [];
    } else {
      // Si las cartas no son iguales, esperar un momento y luego ocultarlas y reiniciar el arreglo de cartas seleccionadas
      if (cardsSelected.length === 2) {
        cardsSelected.forEach((card) => {
          card.classList.add("incorrect");
        });
        setTimeout(() => {
          cardsSelected.forEach((card) => {
            card.classList.remove("incorrect");
            card.classList.remove("selected");
          });
          cardsSelected = [];
        }, 900);
      }
    }
  }

  // Si todas las cartas han sido emparejadas, mostrar un mensaje de victoria y reiniciar el juego
  if (cardsMatched.length === cards.length) {
    setTimeout(() => {
      resetGame();
    }, 1000);
  }
}

// Función para reiniciar el juego
function resetGame() {
  // Reiniciar los arreglos de cartas seleccionadas y emparejadas
  cardsSelected = [];
  cardsMatched = [];
  limpiarCampos();
  // Crear nuevas cartas
  createCards();
}

function limpiarCampos() {
  foundList.innerHTML = "";
  board.innerHTML = "";
}

// Event listener para el botón de reinicio
resetButton.addEventListener("click", resetGame);

// Crear las cartas en el tablero
createCards();
