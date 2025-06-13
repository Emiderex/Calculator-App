const input = document.getElementById("input_values");
const buttons = document.querySelectorAll(".btn");
const historyList = document.getElementById("historyList");

let expression = "";

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

function updateDisplay() {
  input.value = expression;
}

function addToHistory(expr, result) {
  const li = document.createElement("li");
  li.textContent = `${expr} = ${result}`;
  historyList.prepend(li);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (btn.id === "equals") {
      const result = evaluateExpression(expression);
      addToHistory(expression, result);
      expression = result.toString();
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
    historyList.innerHTML = "";
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
