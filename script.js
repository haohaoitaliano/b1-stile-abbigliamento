const questions = [
  {
    prompt: "Come ti piace vestirti nella vita quotidiana?",
    answers: [
      "Con una tuta e delle scarpe da ginnastica.",
      "Con una camicia e dei pantaloni eleganti.",
      "Con capi semplici e comodi, senza troppi dettagli.",
      "Con vestiti originali e colorati.",
    ],
  },
  {
    prompt: "Quali colori preferisci indossare?",
    answers: [
      "Blu, grigio e colori discreti.",
      "Beige, blu scuro e colori raffinati.",
      "Bianco, nero e colori neutri.",
      "Rosso, giallo e colori vivaci.",
    ],
  },
  {
    prompt: "Devi comprare un paio di scarpe. Quali scegli?",
    answers: [
      "Un paio di scarpe da ginnastica comode.",
      "Un paio di scarpe eleganti in pelle.",
      "Un paio di scarpe semplici, senza decorazioni.",
      "Un paio di scarpe particolari che attirano l'attenzione.",
    ],
  },
  {
    prompt: "Che cosa conta di più quando scegli un vestito?",
    answers: [
      "La comodità e la libertà di movimento.",
      "La qualità del tessuto e l'eleganza.",
      "La semplicità e la possibilità di abbinarlo facilmente.",
      "L'originalità e la possibilità di esprimere la mia personalità.",
    ],
  },
  {
    prompt: "Come ti vesti per uscire con gli amici?",
    answers: [
      "Jeans, maglietta e scarpe da ginnastica.",
      "Camicia o camicetta e una bella giacca.",
      "Pantaloni semplici e maglia tinta unita.",
      "Un abbinamento insolito con accessori colorati.",
    ],
  },
  {
    prompt: "Quale accessorio preferisci?",
    answers: [
      "Uno zaino pratico.",
      "Un orologio elegante o una borsa raffinata.",
      "Un accessorio discreto.",
      "Un cappello originale o gioielli particolari.",
    ],
  },
  {
    prompt: "Che cosa pensi delle nuove tendenze della moda?",
    answers: [
      "Le seguo solo se sono comode.",
      "Mi interessano soprattutto quelle eleganti.",
      "Preferisco capi classici senza tempo.",
      "Mi piace sperimentare nuove tendenze.",
    ],
  },
  {
    prompt: "Quale tessuto ti piace di più?",
    answers: [
      "Il cotone morbido e traspirante.",
      "La seta o il cashmere.",
      "Il lino e il cotone dai colori neutri.",
      "I tessuti con fantasie e texture particolari.",
    ],
  },
  {
    prompt: "Come prepari la valigia per un viaggio?",
    answers: [
      "Porto soprattutto vestiti pratici e sportivi.",
      "Preparo abbinamenti curati per ogni occasione.",
      "Porto pochi capi che stanno bene insieme.",
      "Porto vestiti diversi per creare look sempre nuovi.",
    ],
  },
  {
    prompt: "Quale frase descrive meglio il tuo rapporto con la moda?",
    answers: [
      "Voglio sentirmi libero/a di muovermi.",
      "Mi piace essere sempre curato/a.",
      "Per me, meno è meglio.",
      "I vestiti sono un modo per esprimere chi sono.",
    ],
  },
];

const styles = [
  {
    name: "Sportivo e casual",
    resultTitle: "Il tuo stile è sportivo e casual!",
    emoji: "👟",
    description:
      "Ami la comodità, i capi pratici e la libertà di movimento. Il tuo guardaroba ideale ti accompagna con naturalezza in ogni momento della giornata.",
  },
  {
    name: "Elegante e raffinato",
    resultTitle: "Il tuo stile è elegante e raffinato!",
    emoji: "🧥",
    description:
      "Apprezzi i tessuti di qualità, gli abbinamenti curati e i dettagli senza tempo. Ti piace presentarti con un look ordinato e armonioso.",
  },
  {
    name: "Minimalista ed essenziale",
    resultTitle: "Il tuo stile è minimalista ed essenziale!",
    emoji: "◻️",
    description:
      "Preferisci linee pulite, colori neutri e capi facili da abbinare. Per te la semplicità è una scelta precisa, pratica e piena di stile.",
  },
  {
    name: "Creativo e originale",
    resultTitle: "Il tuo stile è creativo e originale!",
    emoji: "🎨",
    description:
      "Usi la moda per raccontare chi sei. Ami sperimentare con colori, fantasie, accessori e abbinamenti capaci di attirare l'attenzione.",
  },
];

const state = {
  currentQuestion: 0,
  answers: Array(questions.length).fill(null),
  scores: [0, 0, 0, 0],
  winners: [],
};

const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const startButton = document.querySelector("#start-button");
const questionCounter = document.querySelector("#question-counter");
const progressPercent = document.querySelector("#progress-percent");
const progressTrack = document.querySelector("#progress-track");
const progressFill = document.querySelector("#progress-fill");
const questionTitle = document.querySelector("#question-title");
const answerList = document.querySelector("#answer-list");
const quizForm = document.querySelector("#quiz-form");
const backButton = document.querySelector("#back-button");
const nextButton = document.querySelector("#next-button");
const resultSummary = document.querySelector("#result-summary");
const scoreList = document.querySelector("#score-list");
const restartButton = document.querySelector("#restart-button");
const copyButton = document.querySelector("#copy-button");
const copyStatus = document.querySelector("#copy-status");

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((item) => {
    item.hidden = item !== screen;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const index = state.currentQuestion;
  const question = questions[index];
  const selectedAnswer = state.answers[index];
  const questionNumber = index + 1;
  const progress = questionNumber * 10;

  questionCounter.textContent = `Domanda ${questionNumber} di ${questions.length}`;
  progressPercent.textContent = `${progress}%`;
  progressTrack.setAttribute("aria-valuenow", String(questionNumber));
  progressFill.style.width = `${progress}%`;
  questionTitle.textContent = question.prompt;
  answerList.replaceChildren();

  question.answers.forEach((answer, answerIndex) => {
    const letter = String.fromCharCode(65 + answerIndex);
    const label = document.createElement("label");
    label.className = "answer-option";
    if (selectedAnswer === answerIndex) {
      label.classList.add("is-selected");
    }

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `question-${index}`;
    input.value = String(answerIndex);
    input.checked = selectedAnswer === answerIndex;
    input.setAttribute("aria-label", `${letter}. ${answer}`);

    const letterSpan = document.createElement("span");
    letterSpan.className = "answer-letter";
    letterSpan.textContent = letter;
    letterSpan.setAttribute("aria-hidden", "true");

    const answerText = document.createElement("span");
    answerText.className = "answer-text";
    answerText.textContent = answer;

    input.addEventListener("change", () => selectAnswer(answerIndex));
    label.append(input, letterSpan, answerText);
    answerList.append(label);
  });

  backButton.hidden = index === 0;
  nextButton.disabled = selectedAnswer === null;
  nextButton.textContent = index === questions.length - 1 ? "Scopri il mio stile" : "Avanti";
}

function selectAnswer(answerIndex) {
  state.answers[state.currentQuestion] = answerIndex;
  answerList.querySelectorAll(".answer-option").forEach((option, index) => {
    option.classList.toggle("is-selected", index === answerIndex);
  });
  nextButton.disabled = false;
}

function calculateResult() {
  if (state.answers.some((answer) => answer === null)) {
    return false;
  }

  state.scores = [0, 0, 0, 0];
  state.answers.forEach((answer) => {
    state.scores[answer] += 1;
  });

  const total = state.scores.reduce((sum, score) => sum + score, 0);
  if (total !== questions.length) {
    throw new Error("Il totale dei punteggi non corrisponde al numero di domande.");
  }

  const highestScore = Math.max(...state.scores);
  state.winners = state.scores
    .map((score, index) => ({ score, index }))
    .filter(({ score }) => score === highestScore)
    .map(({ index }) => index);
  return true;
}

function renderResult() {
  resultSummary.replaceChildren();
  scoreList.replaceChildren();

  if (state.winners.length > 1) {
    const tieNote = document.createElement("p");
    tieNote.className = "tie-note";
    tieNote.textContent = "Hai più stili principali: il tuo guardaroba unisce personalità diverse!";
    resultSummary.append(tieNote);
  }

  state.winners.forEach((styleIndex) => {
    const style = styles[styleIndex];
    const card = document.createElement("article");
    card.className = "style-result-card";
    card.innerHTML = `
      <div class="style-visual" aria-hidden="true">${style.emoji}</div>
      <div>
        <h2>${style.resultTitle}</h2>
        <p>${style.description}</p>
      </div>
    `;
    resultSummary.append(card);
  });

  styles.forEach((style, index) => {
    const score = state.scores[index];
    const row = document.createElement("div");
    row.className = "score-row";
    row.innerHTML = `
      <span class="score-label">${style.emoji} ${style.name}</span>
      <span class="score-bar" aria-hidden="true"><span style="width: ${score * 10}%"></span></span>
      <span class="score-value" aria-label="${score} punti su 10">${score}</span>
    `;
    scoreList.append(row);
  });
}

function buildCopyText() {
  const winnerNames = state.winners.map((index) => styles[index].name).join(" + ");
  const scoreLines = styles.map((style, index) => `${style.name}: ${state.scores[index]}/10`).join("\n");
  return `Qual è il tuo stile di abbigliamento?\n\nIl mio risultato: ${winnerNames}\n\n${scoreLines}`;
}

async function copyResult() {
  const text = buildCopyText();
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  let copied = document.execCommand("copy");
  textarea.remove();

  if (!copied && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = false;
    }
  }

  copyStatus.textContent = copied ? "Risultato copiato!" : "Non è stato possibile copiare il risultato.";
  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 6000);
}

function restartQuiz() {
  state.currentQuestion = 0;
  state.answers.fill(null);
  state.scores.fill(0);
  state.winners = [];
  copyStatus.textContent = "";
  renderQuestion();
  showScreen(startScreen);
  startButton.focus({ preventScroll: true });
}

startButton.addEventListener("click", () => {
  renderQuestion();
  showScreen(quizScreen);
  questionTitle.focus?.({ preventScroll: true });
});

nextButton.addEventListener("click", () => {
  if (state.answers[state.currentQuestion] === null) {
    return;
  }
  if (state.currentQuestion < questions.length - 1) {
    state.currentQuestion += 1;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (calculateResult()) {
    renderResult();
    showScreen(resultScreen);
  }
});

backButton.addEventListener("click", () => {
  if (state.currentQuestion > 0) {
    state.currentQuestion -= 1;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

quizForm.addEventListener("submit", (event) => event.preventDefault());
quizForm.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

restartButton.addEventListener("click", restartQuiz);
copyButton.addEventListener("click", copyResult);
