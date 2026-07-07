const introView = document.getElementById("introView");
const quizView = document.getElementById("quizView");
const resultView = document.getElementById("resultView");
const questionsEl = document.getElementById("questions");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const selectedText = document.getElementById("selectedText");
const nextBtn = document.getElementById("nextBtn");
const toast = document.getElementById("toast");
const resultType = document.getElementById("resultType");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const hiddenResults = document.getElementById("hiddenResults");
const evidenceList = document.getElementById("evidenceList");

let selectedOptions = [];

function add(obj) {
  Object.keys(obj).forEach((key) => {
    if (gameData.stats[key] !== undefined) gameData.stats[key] += obj[key];
  });
}

function showView(viewName) {
  introView.classList.toggle("active", viewName === "intro");
  quizView.classList.toggle("active", viewName === "quiz");
  resultView.classList.toggle("active", viewName === "result");

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (viewName === "quiz") {
    document.documentElement.style.background = "#fffaf1";
    document.body.style.background = "#fffaf1";
    if (themeMeta) themeMeta.content = "#fffaf1";
  } else {
    document.documentElement.style.background = "";
    document.body.style.background = "";
    if (themeMeta) themeMeta.content = "#1f2b2c";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message = "请选择 1-2 项") {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1400);
}

function updateEvidence() {
  evidenceList.innerHTML = gameData.evidence.length
    ? gameData.evidence.map((item) => `
      <div class="score-row">
        <label><span>${item}</span></label>
        <div class="bar"><span style="width:100%"></span></div>
      </div>
    `).join("")
    : `<p class="hint">暂无证据</p>`;
}

function updateSelectionUI() {
  document.querySelectorAll(".option").forEach((button) => {
    const selected = selectedOptions.includes(button.dataset.option);
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
  selectedText.textContent = selectedOptions.length ? `已选 ${selectedOptions.length} 项` : "未选择";
  nextBtn.disabled = selectedOptions.length === 0;
}

function render() {
  const q = questions[gameData.current];
  const total = Object.keys(questions).length;
  const answered = Math.max(0, gameData.history.length);
  selectedOptions = [];

  progressText.textContent = `第 ${q.id} / ${total} 题`;
  progressBar.style.width = `${Math.max(0, (q.id - 1) / total * 100)}%`;
  nextBtn.textContent = q.next([]) === "RESULT" ? "查看结局" : "确认";

  const options = QuizCore.optionButtons(q);

  questionsEl.innerHTML = `
    <article class="question">
      <div class="question-head">
        <p class="question-title">${q.text}</p>
      </div>
      <div class="options">${options}</div>
    </article>
  `;

  updateSelectionUI();
  updateEvidence();
  showView("quiz");
}

function toggleOption(letter) {
  const existing = selectedOptions.indexOf(letter);
  if (existing >= 0) {
    selectedOptions.splice(existing, 1);
  } else {
    if (selectedOptions.length >= 2) {
      showToast();
      return;
    }
    selectedOptions.push(letter);
    selectedOptions.sort();
  }
  updateSelectionUI();
}

function choose() {
  if (selectedOptions.length < 1 || selectedOptions.length > 2) {
    showToast();
    return;
  }

  const q = questions[gameData.current];
  selectedOptions.forEach((letter) => {
    add(q.effects[letter] || {});

    if (q.evidence && q.evidence[letter]) {
      q.evidence[letter].forEach((item) => {
        if (!gameData.evidence.includes(item)) gameData.evidence.push(item);
      });
    }

    gameData.history.push({ q: gameData.current, a: letter });
  });

  const next = q.next(selectedOptions);
  if (next === "END9") {
    showFinal({
      title: "误伤南瓜结局",
      text: "没有地图和情报，你击败的是丰收节南瓜灯。"
    }, []);
    return;
  }

  if (next === "RESULT") {
    finish();
    return;
  }

  gameData.current = next;
  render();
}

function finish() {
  const s = gameData.stats;
  const ev = gameData.evidence;
  let normal = null;
  const hidden = [];

  if (s.fight >= 8 && s.question < 4) {
    normal = {
      title: "标准勇士结局：龙倒下了，奖章亮了",
      text: "你完成了国王最初的命令。巨龙倒下，王都举行盛大的庆典。所有人称赞你的勇气。只是多年以后，你发现山谷里的问题并没有随着龙的死亡消失。"
    };
  } else if (s.fight >= 6 && s.investigate <= 3) {
    normal = {
      title: "勇士失业结局：龙没了，问题还在",
      text: "你解决了一个敌人，却没有解决造成冲突的原因。王国很快又需要寻找新的怪物。"
    };
  } else if (s.fight >= 5 && s.dragon >= 2) {
    normal = {
      title: "烤焦披风结局：你赢了，但不太体面",
      text: "你击败了龙，但你的披风也被烧得无法恢复。吟游诗人最终选择把这部分写成喜剧。"
    };
  } else if (s.fight >= 5 && s.question <= 2) {
    normal = {
      title: "王国宣传片结局：你被剪进了片头",
      text: "王国制作了一部英雄宣传片。所有复杂的问题都被删掉，只留下勇士和恶龙。"
    };
  } else if (s.dragon >= 5 && s.fight < 4 && s.compromise < 3) {
    normal = {
      title: "龙跑了结局：它比你更会看形势",
      text: "你还在考虑下一步，龙已经带着财宝和书籍离开山谷。"
    };
  } else if (s.dragon >= 6 && s.people >= 3) {
    normal = {
      title: "龙的邻居结局：原来它只是很吵",
      text: "你发现最大的冲突不是吃人与被吃，而是长期缺少沟通。最终双方制定了新的生活规则。"
    };
  } else if (s.dragon >= 6 && ev.includes("龙的收藏记录")) {
    normal = {
      title: "山洞合租结局：勇士暂住，龙不包水电",
      text: "你和龙短暂共同生活，发现彼此都不像传闻中那样。"
    };
  } else if (s.people >= 7 && s.compromise >= 4) {
    normal = {
      title: "边境公务员结局：从屠龙变调解",
      text: "你没有杀死龙，而是处理了道路、水源、税收和赔偿问题。"
    };
  } else if (s.investigate >= 7 && s.fight < 5) {
    normal = {
      title: "任务延期结局：你决定再查查",
      text: "你拒绝仓促行动，把更多时间投入调查。"
    };
  } else if (s.communicate >= 6 && s.compromise >= 5) {
    normal = {
      title: "两边都骂结局：可能你做对了",
      text: "国王不满意，龙不满意，村民也抱怨过程太慢。但你没有让任何一方完全吞掉其他人的声音。"
    };
  } else {
    normal = {
      title: "传说打折结局：没有史诗，只有收据",
      text: "你没有成为传奇英雄，但避免了一场不必要的战争。"
    };
  }

  if (ev.includes("王室账本") && ev.includes("龙巢旧契约")) {
    hidden.push({
      title: "隐藏结局：龙的税单",
      text: "你揭开了恶龙事件背后的真相。所谓怪物危机，实际上隐藏着王国矿产利益争夺。"
    });
  }

  if (s.dragon >= 8 && s.communicate >= 8) {
    hidden.push({
      title: "隐藏结局：勇士与龙开小店",
      text: "多年后，山谷入口出现一家特殊商店：热汤、地图，以及龙火烘干服务。"
    });
  }

  if (s.question >= 10 && ev.includes("王室账本") && ev.includes("证据副本")) {
    hidden.push({
      title: "隐藏结局：国王才是最终Boss",
      text: "你发现真正制造恐惧的不是山谷里的龙，而是利用恐惧维持权力的人。"
    });
  }

  if (s.communicate >= 8 && s.question >= 6 && s.fight < 4) {
    hidden.push({
      title: "隐藏结局：没有恶龙的勇士",
      text: "你没有杀龙，也没有把龙塑造成朋友。你只是拒绝让恐惧替别人做决定。"
    });
  }

  showFinal(normal, hidden);
}

function showFinal(normal, hidden) {
  resultType.textContent = hidden.length ? `普通结局 + ${hidden.length} 个隐藏结局` : "普通结局";
  resultTitle.textContent = normal.title;
  resultText.textContent = normal.text;
  hiddenResults.innerHTML = hidden.length ? `
    <div class="epilogue">
      <h3>隐藏结局解锁</h3>
      ${hidden.map((item) => `<p><strong>${item.title}</strong><br>${item.text}</p>`).join("")}
    </div>
  ` : "";
  progressBar.style.width = "100%";
  updateEvidence();
  showView("result");
}

function reset() {
  gameData.current = "Q1";
  gameData.history = [];
  gameData.stats = { fight: 0, investigate: 0, communicate: 0, question: 0, people: 0, dragon: 0, compromise: 0 };
  gameData.evidence = [];
  gameData.relations = { dragon: 0, king: 0, villagers: 0 };
  selectedOptions = [];
  showView("intro");
}

questionsEl.addEventListener("click", (event) => {
  const button = event.target.closest(".option");
  if (!button) return;
  toggleOption(button.dataset.option);
});

document.getElementById("startBtn").addEventListener("click", render);
document.getElementById("nextBtn").addEventListener("click", choose);
document.getElementById("againBtn").addEventListener("click", reset);
