const questions = [
  {
    category: "EL SISTEMA SOLAR",
    question: "¿Qué planeta es conocido como el planeta rojo?",
    answers: ["Venus", "Marte", "Júpiter", "Mercurio"],
    correct: 1,
    fact: "Marte parece rojo por el óxido de hierro que cubre su superficie."
  },
  {
    category: "NUESTRA ESTRELLA",
    question: "¿Qué es el Sol?",
    answers: ["Un planeta gigante", "Una luna", "Una estrella", "Un cometa"],
    correct: 2,
    fact: "El Sol es una estrella: produce luz y calor mediante la fusión nuclear."
  },
  {
    category: "LA LUNA",
    question: "¿Cuánto tarda aproximadamente la Luna en orbitar la Tierra?",
    answers: ["Un día", "Una semana", "Un mes", "Un año"],
    correct: 2,
    fact: "La Luna completa una órbita alrededor de la Tierra en unos 27 días."
  },
  {
    category: "PLANETAS",
    question: "¿Cuál es el planeta más grande del sistema solar?",
    answers: ["Saturno", "Júpiter", "Neptuno", "Tierra"],
    correct: 1,
    fact: "Júpiter es tan grande que cabrían más de 1.300 Tierras en su interior."
  },
  {
    category: "EXPLORACIÓN ESPACIAL",
    question: "¿Cómo se llamó el primer satélite artificial de la historia?",
    answers: ["Voyager 1", "Sputnik 1", "Apollo 11", "Hubble"],
    correct: 1,
    fact: "La Unión Soviética lanzó el Sputnik 1 en 1957."
  },
  {
    category: "EL UNIVERSO",
    question: "¿Qué galaxia contiene nuestro sistema solar?",
    answers: ["Andrómeda", "Galaxia del Sombrero", "Vía Láctea", "Ojo Negro"],
    correct: 2,
    fact: "Nuestro sistema solar se encuentra en uno de los brazos espirales de la Vía Láctea."
  },
  {
    category: "PLANETAS",
    question: "¿Qué planeta es famoso por sus brillantes anillos?",
    answers: ["Saturno", "Marte", "Venus", "Mercurio"],
    correct: 0,
    fact: "Saturno tiene un espectacular sistema de anillos formado sobre todo por hielo y roca."
  },
  {
    category: "ASTRONOMÍA",
    question: "¿Cómo se llama el paso de la Luna entre la Tierra y el Sol?",
    answers: ["Eclipse lunar", "Lluvia de meteoros", "Eclipse solar", "Solsticio"],
    correct: 2,
    fact: "En un eclipse solar, la Luna se interpone entre la Tierra y el Sol."
  }
];

const intro = document.querySelector("#intro");
const game = document.querySelector("#game");
const results = document.querySelector("#results");
const startButton = document.querySelector("#start-button");
const nextButton = document.querySelector("#next-button");
const restartButton = document.querySelector("#restart-button");
const questionCount = document.querySelector("#question-count");
const scoreElement = document.querySelector("#score");
const progressFill = document.querySelector("#progress-fill");
const progressTrack = document.querySelector(".progress-track");
const categoryElement = document.querySelector("#category");
const questionElement = document.querySelector("#question");
const answersElement = document.querySelector("#answers");
const feedbackElement = document.querySelector("#feedback");
const finalScore = document.querySelector("#final-score");
const resultTitle = document.querySelector("#result-title");
const resultMessage = document.querySelector("#result-message");
const resultIcon = document.querySelector("#result-icon");

let currentQuestion = 0;
let score = 0;
let answered = false;

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  scoreElement.textContent = score;
  intro.classList.add("hidden");
  results.classList.add("hidden");
  game.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const item = questions[currentQuestion];
  answered = false;
  questionCount.textContent = `PREGUNTA ${currentQuestion + 1} DE ${questions.length}`;
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  progressTrack.setAttribute("aria-valuenow", currentQuestion);
  categoryElement.textContent = item.category;
  questionElement.textContent = item.question;
  feedbackElement.textContent = "";
  feedbackElement.classList.remove("wrong");
  nextButton.classList.add("hidden");
  answersElement.replaceChildren();

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span></span>`;
    button.lastElementChild.textContent = answer;
    button.addEventListener("click", () => chooseAnswer(index));
    answersElement.append(button);
  });
}

function chooseAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  const item = questions[currentQuestion];
  const buttons = [...answersElement.querySelectorAll(".answer")];
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add("correct");
    if (index === selectedIndex && index !== item.correct) button.classList.add("incorrect");
  });

  if (selectedIndex === item.correct) {
    score += 1;
    scoreElement.textContent = score;
    feedbackElement.textContent = `¡Correcto! ${item.fact}`;
  } else {
    feedbackElement.classList.add("wrong");
    feedbackElement.textContent = `Casi. ${item.fact}`;
  }
  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  progressTrack.setAttribute("aria-valuenow", currentQuestion + 1);
  nextButton.textContent = currentQuestion === questions.length - 1 ? "Ver resultado" : "Siguiente pregunta →";
  nextButton.classList.remove("hidden");
}

function showResults() {
  game.classList.add("hidden");
  results.classList.remove("hidden");
  finalScore.textContent = score;

  if (score === questions.length) {
    resultIcon.textContent = "🏆";
    resultTitle.textContent = "¡Explorador estelar!";
    resultMessage.textContent = "¡Puntuación perfecta! El universo no tiene secretos para ti.";
  } else if (score >= 5) {
    resultIcon.textContent = "🌟";
    resultTitle.textContent = "¡Gran misión!";
    resultMessage.textContent = "Sabes un montón del cosmos. ¡Sigue explorando!";
  } else if (score >= 3) {
    resultIcon.textContent = "🪐";
    resultTitle.textContent = "¡Buen viaje!";
    resultMessage.textContent = "Vas por buen camino. Una nueva misión te espera.";
  } else {
    resultIcon.textContent = "🚀";
    resultTitle.textContent = "¡A seguir explorando!";
    resultMessage.textContent = "Cada astronauta empieza en algún lugar. ¡Prueba otra vez!";
  }
}

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
  currentQuestion += 1;
  if (currentQuestion < questions.length) showQuestion();
  else showResults();
});
