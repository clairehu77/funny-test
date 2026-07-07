const state = {
  answers: Array.from({ length: questions.length }, () => []),
  current: 0,
  currentEndingKey: null
};

const homeView = document.getElementById("homeView");
const introView = document.getElementById("introView");
const quizView = document.getElementById("quizView");
const resultView = document.getElementById("resultView");
const questionsEl = document.getElementById("questions");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const selectedText = document.getElementById("selectedText");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const resultType = document.getElementById("resultType");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const rarityLabel = document.getElementById("rarityLabel");
const rarityValue = document.getElementById("rarityValue");
const rarityFill = document.getElementById("rarityFill");
const epilogueText = document.getElementById("epilogueText");
const resultTag = document.getElementById("resultTag");
const reasonText = document.getElementById("reasonText");
const scoreList = document.getElementById("scoreList");
const toast = document.getElementById("toast");

function renderQuestions() {
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

function toggleOption(questionIndex, option) {
  const selected = state.answers[questionIndex];
  const existing = selected.indexOf(option);
  if (existing >= 0) {
    selected.splice(existing, 1);
  } else {
    if (selected.length >= 2) {
      showToast();
      return;
    }
    selected.push(option);
    selected.sort();
  }
  updateUI();
}

function updateUI() {
  document.querySelectorAll(".option").forEach((button) => {
    const selected = state.answers[state.current].includes(button.dataset.option);
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });

  const completed = state.answers.filter((answer) => answer.length > 0).length;
  const currentAnswer = state.answers[state.current];
  progressText.textContent = `第 ${state.current + 1} / ${questions.length} 题`;
  selectedText.textContent = currentAnswer.length ? `已选 ${currentAnswer.length} 项` : "未选择";
  progressBar.style.width = `${completed / questions.length * 100}%`;
  nextBtn.textContent = state.current === questions.length - 1 ? "查看结局" : "下一题";
  nextBtn.disabled = currentAnswer.length === 0;
  nextBtn.classList.add("primary");
}

function showToast() {
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1400);
}

function showView(viewName) {
  homeView.classList.toggle("active", viewName === "home");
  introView.classList.toggle("active", viewName === "intro");
  quizView.classList.toggle("active", viewName === "quiz");
  resultView.classList.toggle("active", viewName === "result");

  // 答题页：整体改为浅色，让安全区与答题卡片一致
  // 其他页：恢复深色渐变背景
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (viewName === "quiz") {
    document.documentElement.style.background = "#fff9ec";
    document.body.style.background = "#fff9ec";
    if (themeMeta) themeMeta.content = "#fff9ec";
  } else {
    document.documentElement.style.background = "";
    document.body.style.background = "";
    if (themeMeta) themeMeta.content = "#151735";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goToQuestion(index) {
  state.current = Math.max(0, Math.min(questions.length - 1, index));
  renderQuestions();
  updateUI();
  showView("quiz");
}

function nextStep() {
  if (state.answers[state.current].length === 0) {
    toast.textContent = `第 ${state.current + 1} 题还没选`;
    showToast();
    window.setTimeout(() => { toast.textContent = "每题最多选 2 个选项"; }, 1500);
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
    const weight = questionIndex >= 9 ? 1.25 : 1;
    answer.forEach((letter) => {
      const tags = scoreMap[questionIndex][letter] || [];
      tags.forEach((tag) => {
        scores[tag] = (scores[tag] || 0) + weight;
      });
    });
  });

  return scores;
}

function countEarly(tags) {
  let count = 0;
  state.answers.slice(0, 11).forEach((answer, questionIndex) => {
    answer.forEach((letter) => {
      const optionTags = scoreMap[questionIndex][letter] || [];
      if (tags.some((tag) => optionTags.includes(tag))) count += 1;
    });
  });
  return count;
}

function has(questionIndex, letter) {
  return state.answers[questionIndex].includes(letter);
}

function topScores(scores) {
  return Object.entries(scores)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
}

function getEndingKey(ending) {
  const found = Object.entries(endings).find(([, value]) => value === ending);
  return found ? found[0] : "discount";
}

function submit() {
  const unanswered = state.answers.findIndex((answer) => answer.length === 0);
  if (unanswered >= 0) {
    goToQuestion(unanswered);
    toast.textContent = `第 ${unanswered + 1} 题还没选`;
    showToast();
    window.setTimeout(() => { toast.textContent = "每题最多选 2 个选项"; }, 1500);
    return;
  }

  const scores = calculateScores();
  const ending = chooseEnding(scores);
  const endingKey = getEndingKey(ending);
  const meta = endingMeta[endingKey] || endingMeta.discount;
  state.currentEndingKey = endingKey;
  resultType.textContent = ending.type;
  resultTitle.textContent = ending.title;
  resultTag.textContent = ending.tag || "";
  resultText.textContent = ending.text;
  rarityLabel.textContent = meta.rarity;
  rarityValue.textContent = `约 ${meta.percent}% 的见习法师会抵达这里`;
  rarityFill.style.width = `${Math.max(3, Math.min(100, meta.percent))}%`;
  epilogueText.textContent = meta.epilogue;
  reasonText.textContent = ending.reason;
  renderScores(scores);
  resultEl.classList.add("show");
  showView("result");
}

function renderScores(scores) {
  const top = topScores(scores);
  const max = Math.max(...top.map(([, value]) => value), 1);
  scoreList.innerHTML = top.map(([key, value]) => `
    <div class="score-row">
      <label><span>${labels[key]}</span><span>${value.toFixed(value % 1 ? 1 : 0)}</span></label>
      <div class="bar"><span style="width:${Math.round(value / max * 100)}%"></span></div>
    </div>
  `).join("");
}


function reset() {
  state.answers = Array.from({ length: questions.length }, () => []);
  state.current = 0;
  resultEl.classList.remove("show");
  renderQuestions();
  updateUI();
  showView("intro");
}

questionsEl.addEventListener("click", (event) => {
  const button = event.target.closest(".option");
  if (!button) return;
  toggleOption(state.current, button.dataset.option);
});

document.getElementById("startBtn").addEventListener("click", () => goToQuestion(0));
document.getElementById("magicEntryBtn").addEventListener("click", () => showView("intro"));
document.getElementById("nextBtn").addEventListener("click", nextStep);
document.getElementById("againBtn").addEventListener("click", reset);

renderQuestions();
updateUI();
