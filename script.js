// Declare variables
const input = document.getElementById("input_values");
const buttons = document.querySelectorAll(".btn");
const historyList = document.getElementById("historyList");
const toggleHistoryBtn = document.getElementById("toggleHistory");
const historyPanel = document.getElementById("history");

// Initialize the expression string
let expression = "";

/* Evaluate the expression replacing symbols with JS operators */
function evaluateExpression(expr) {
  try {
    const calculator = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\^/g, "**");
    const result = eval(calculator);
    return result;
  } catch {
    return "Error";
  }
}

/* Update the input display */
function updateDisplay() {
  input.value = expression;
}

/* Button clicks */
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (btn.id === "equals") {
      const result = evaluateExpression(expression);
      addToHistory(expression, result);
      expression = result.toString();
    } else if (btn.classList.contains("btn_backspace")) {
      expression = expression.slice(0, -1); // only modify expression
    } else if (btn.classList.contains("btn_clear")) {
      expression = "";
    } else if (value === "%") {
      const match = expression.match(/(\d+\.?\d*)$/);
      if (match) {
        const num = match[1];
        const percentage = parseFloat(num) / 100;
        expression = expression.replace(/(\d+\.?\d*)$/, percentage);
      }
    } else {
      expression += value;
    }

    updateDisplay();
  });
});

/* Keyboard support */
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (/\d|\+|\-|\*|\/|\.|\(|\)/.test(key)) {
    expression += key;
  } else if (key === "Enter") {
    const result = evaluateExpression(expression);
    addToHistory(expression, result);
    expression = result.toString();
  } else if (key === "Backspace") {
    expression = expression.slice(0, -1);
  } else if (key === "c" || key === "C") {
    expression = "";
  } else if (key === "%") {
    const match = expression.match(/(\d+\.?\d*)$/);
    if (match) {
      const num = match[1];
      const percentage = parseFloat(num) / 100;
      expression = expression.replace(/(\d+\.?\d*)$/, percentage);
    }
  }

  updateDisplay();
});

// Toggle open/close when arrow is clicked
toggleHistoryBtn.addEventListener("click", () => {
  historyPanel.classList.toggle("hidden");
  toggleHistoryBtn.classList.toggle("open");
});

/* Add to history if not duplicate */
function addToHistory(expr, result) {
  const entries = Array.from(historyList.querySelectorAll("li"))
    .map(li => li.textContent.split(' = ')[0]);
  if (!entries.includes(expr)) {
    const li = document.createElement("li");
    li.textContent = `${expr} = ${result}`;
    historyList.prepend(li);
  }
}