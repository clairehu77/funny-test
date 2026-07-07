window.QuizCore = {
  displayLabels: ["A", "B", "C", "D", "E", "F"],

  shuffle(items) {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  optionButtons(question) {
    const entries = this.shuffle(Object.entries(question.options));
    return entries.map(([letter, text], index) => `
      <button class="option" type="button" data-option="${letter}" aria-pressed="false">
        <span class="letter">${this.displayLabels[index]}</span>
        <span>${text}</span>
      </button>
    `).join("");
  },

  getSelectRule(question, fallback = { min: 1, max: 2 }) {
    return question.selectRule || fallback;
  },

  selectRuleText(rule) {
    if (rule.min === rule.max) return `请选择 ${rule.max} 项`;
    return `请选择 ${rule.min}-${rule.max} 项`;
  },

  getEarlyEnding(question, selectedOptions) {
    if (!question.earlyEndings) return null;

    const selected = new Set(selectedOptions);
    const priority = question.earlyEndingPriority || Object.keys(question.earlyEndings);
    const option = priority.find((letter) => selected.has(letter) && question.earlyEndings[letter]);
    if (!option) return null;

    const config = question.earlyEndings[option];
    return typeof config === "string" ? { key: config, option } : { option, ...config };
  }
};
