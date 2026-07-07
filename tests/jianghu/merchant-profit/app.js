const state = {
  answers: Array.from({ length: questions.length }, () => []),
  current: 0
};

const introView = document.getElementById("introView");
const quizView = document.getElementById("quizView");
const resultView = document.getElementById("resultView");
const questionsEl = document.getElementById("questions");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const selectedText = document.getElementById("selectedText");
const nextBtn = document.getElementById("nextBtn");
const resultType = document.getElementById("resultType");
const resultTitle = document.getElementById("resultTitle");
const resultTag = document.getElementById("resultTag");
const resultText = document.getElementById("resultText");
const rarityLabel = document.getElementById("rarityLabel");
const rarityValue = document.getElementById("rarityValue");
const rarityFill = document.getElementById("rarityFill");
const epilogueText = document.getElementById("epilogueText");
const reasonText = document.getElementById("reasonText");
const scoreList = document.getElementById("scoreList");
const toast = document.getElementById("toast");

function getRule(question) {
  return QuizCore.getSelectRule(question);
}

function ruleText(rule) {
  return QuizCore.selectRuleText(rule);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1400);
}

function showView(viewName) {
  introView.classList.toggle("active", viewName === "intro");
  quizView.classList.toggle("active", viewName === "quiz");
  resultView.classList.toggle("active", viewName === "result");

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (viewName === "quiz") {
    document.documentElement.style.background = "#fff8ea";
    document.body.style.background = "#fff8ea";
    if (themeMeta) themeMeta.content = "#fff8ea";
  } else {
    document.documentElement.style.background = "";
    document.body.style.background = "";
    if (themeMeta) themeMeta.content = "#2a241d";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const question = questions[state.current];
  const options = QuizCore.optionButtons(question);

  questionsEl.innerHTML = `
    <article class="question">
      <div class="question-head">
        <p class="question-title">${question.text}</p>
      </div>
      <div class="options">${options}</div>
    </article>
  `;
}

function updateUI() {
  const question = questions[state.current];
  const rule = getRule(question);
  const answer = state.answers[state.current];
  const completed = state.answers.reduce((sum, item, index) => (
    item.length >= getRule(questions[index]).min ? sum + 1 : sum
  ), 0);

  document.querySelectorAll(".option").forEach((button) => {
    const selected = answer.includes(button.dataset.option);
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });

  progressText.textContent = `第 ${state.current + 1} / ${questions.length} 题`;
  progressBar.style.width = `${completed / questions.length * 100}%`;
  selectedText.textContent = answer.length ? `已选 ${answer.length} 项` : ruleText(rule);
  nextBtn.textContent = state.current === questions.length - 1 ? "查看结局" : "下一题";
  nextBtn.disabled = answer.length < rule.min || answer.length > rule.max;
}

function toggleOption(letter) {
  const question = questions[state.current];
  const rule = getRule(question);
  const answer = state.answers[state.current];
  const existing = answer.indexOf(letter);

  if (existing >= 0) {
    answer.splice(existing, 1);
  } else if (rule.max === 1) {
    answer.splice(0, answer.length, letter);
  } else {
    if (answer.length >= rule.max) {
      showToast(`本题最多选 ${rule.max} 项`);
      return;
    }
    answer.push(letter);
    answer.sort();
  }

  updateUI();
}

function goToQuestion(index) {
  state.current = Math.max(0, Math.min(questions.length - 1, index));
  renderQuestion();
  updateUI();
  showView("quiz");
}

function nextStep() {
  const question = questions[state.current];
  const rule = getRule(question);
  const answer = state.answers[state.current];

  if (answer.length < rule.min || answer.length > rule.max) {
    showToast(ruleText(rule));
    return;
  }

  const earlyEnding = QuizCore.getEarlyEnding(question, answer);
  if (earlyEnding) {
    submit(earlyEnding.key);
    return;
  }

  if (state.current === questions.length - 1) {
    submit();
    return;
  }

  goToQuestion(state.current + 1);
}

function calculateScores() {
  const scores = {};
  Object.keys(labels).forEach((key) => { scores[key] = 0; });

  state.answers.forEach((answer, questionIndex) => {
    answer.forEach((letter) => {
      const score = scoreMap[questionIndex][letter] || { wealth: 0, tags: [] };
      scores.wealth += score.wealth || 0;
      (score.tags || []).forEach((tag) => {
        scores[tag] = (scores[tag] || 0) + 1;
      });
    });
  });

  return scores;
}

function has(questionNumber, letter) {
  return state.answers[questionNumber - 1]?.includes(letter);
}

function chooseEnding(scores) {
  if (scores.broker >= 8 && scores.wealth >= 40 && (has(30, "B") || has(30, "D"))) return endings.martialLeader;
  if (has(20, "A") && has(21, "A") && scores.triple >= 3) return endings.multiHunted;
  if (scores.monopoly >= 3 && scores.resource >= 8) return endings.accidentalMonopoly;
  if ((has(31, "C") || has(31, "D")) && scores.conscience >= 5 && scores.wealth >= 5 && scores.wealth < 48) return endings.forcedHero;

  if (scores.wealth >= 72) {
    if (scores.info >= 8) return endings.intelHub;
    return endings.resourceThrottle;
  }

  if (scores.wealth >= 50) {
    if (scores.risk < 3) return endings.quietRich;
    if (scores.risk >= 6) return endings.recklessRich;
    return endings.richLooseEnds;
  }

  if (scores.wealth >= 24) {
    if (scores.conscience >= 7) return endings.conscienceDrag;
    if (scores.info >= 6) return endings.infoDealer;
    if (scores.criticalFail >= 1) return endings.oneStepShort;
    if (scores.broker >= 5) return endings.accidentalInsider;
    return endings.steadyBroker;
  }

  if (scores.wealth >= 5) {
    if (scores.triple >= 2) return endings.counterScammed;
    if (scores.conscience >= 10) return endings.tooHonest;
    return endings.badRead;
  }

  if (scores.triple >= 3 || scores.risk >= 7) return endings.manyDebts;
  if (has(21, "D") || has(23, "D") || has(24, "D")) return endings.singleDebt;
  return endings.vanished;
}

function getEndingKey(ending) {
  const found = Object.entries(endings).find(([, value]) => value === ending);
  return found ? found[0] : "steadyBroker";
}

function topScores(scores) {
  return Object.entries(scores)
    .filter(([key, value]) => key !== "wealth" && value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
}

function renderScores(scores) {
  const top = topScores(scores);
  const max = Math.max(...top.map(([, value]) => value), 1);
  const rows = [
    `<div class="score-row">
      <label><span>${labels.wealth}</span><span>${scores.wealth}</span></label>
      <div class="bar"><span style="width:${Math.max(4, Math.min(100, Math.round(scores.wealth / 96 * 100)))}%"></span></div>
    </div>`
  ];

  rows.push(...top.map(([key, value]) => `
    <div class="score-row">
      <label><span>${labels[key]}</span><span>${value}</span></label>
      <div class="bar"><span style="width:${Math.round(value / max * 100)}%"></span></div>
    </div>
  `));

  scoreList.innerHTML = rows.join("");
}

function renderEnding(endingKey, scores) {
  const ending = endings[endingKey] || endings.steadyBroker;
  const meta = endingMeta[endingKey] || endingMeta.steadyBroker;

  resultType.textContent = ending.type;
  resultTitle.textContent = ending.title;
  resultTag.textContent = ending.tag || "";
  resultText.textContent = ending.text;
  rarityLabel.textContent = meta.rarity;
  rarityValue.textContent = `约 ${meta.percent}% 的老板会抵达这里`;
  rarityFill.style.width = `${Math.max(3, Math.min(100, meta.percent))}%`;
  epilogueText.textContent = meta.epilogue;
  reasonText.textContent = ending.reason;
  renderScores(scores);
  showView("result");
}

function submit(forcedEndingKey) {
  const scores = calculateScores();
  if (forcedEndingKey) {
    renderEnding(forcedEndingKey, scores);
    return;
  }

  const unanswered = state.answers.findIndex((answer, index) => answer.length < getRule(questions[index]).min);
  if (unanswered >= 0) {
    goToQuestion(unanswered);
    showToast(`第 ${unanswered + 1} 题还没选`);
    return;
  }

  const ending = chooseEnding(scores);
  renderEnding(getEndingKey(ending), scores);
}

function reset() {
  state.answers = Array.from({ length: questions.length }, () => []);
  state.current = 0;
  showView("intro");
}

questionsEl.addEventListener("click", (event) => {
  const button = event.target.closest(".option");
  if (!button) return;
  toggleOption(button.dataset.option);
});

document.getElementById("startBtn").addEventListener("click", () => goToQuestion(0));
document.getElementById("nextBtn").addEventListener("click", nextStep);
document.getElementById("againBtn").addEventListener("click", reset);
