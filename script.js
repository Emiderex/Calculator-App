// Declaring the variables
const input = document.getElementById("input_values");
const buttons = document.querySelectorAll(".btn");
const historyList = document.getElementById("historyList");

// Initialize the expression string
let expression = "";

/**
 Function that evalautes the expression replacing symbols with JavaScript operators 
 */
function evaluateExpression(expr) {
  try {
    const calculator = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\^/g, "**");

    const result = eval(calculator); // Use eval to calculate
    return result;
  } catch {
    return "Error"
  }
}

/* Add the current expression to the input */
function updateDisplay() {
  input.value = expression;
}

/* Add the last calculated expression and its result to the history. */
function addToHistory(expr, result) {
  const li = document.createElement("li");
  li.textContent = `${expr} = ${result}`;
  historyList.prepend(li); // Add to the top of the list
}

/* Making the buttons clickable */
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;


    /* A condition for the equals button, clear button and percentage button */
    if (btn.id === "equals") {
      const result = evaluateExpression(expression);
      addToHistory(expression, result);
      expression = result.toString();
    } else if (btn.classList.contains("btn_clear")) {
      expression = "";
      historyList.innerHTML = "";
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

    updateDisplay(); /*This refresh all operation performed*/
  });
});

/* Working on the Key Event */
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

  updateDisplay(); // Refresh display for every change
});
