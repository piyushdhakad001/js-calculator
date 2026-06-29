const calculationBox = document.querySelector(".calculation-box");
const liveAnswerBox = document.querySelector(".answer-box");
const clearButton = document.querySelector(".clear-button");
const isEqualButton = document.querySelector(".is-equal-button");
let historyBox = document.querySelector(".history-box");
const clearHistory = document.querySelector(".clear-history");

let history = JSON.parse(localStorage.getItem("history")) || [];

renderHistory();

let calculation = "";
const operators = ["+", "÷", "×", "−"];

const button = document.querySelectorAll(".button");

button.forEach((buttons) => {
  buttons.addEventListener("click", () => {
    addClickedButton(buttons);
  });
});

function toMathExpression(str) {
  return str.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
}

function addClickedButton(buttons) {
  calculation += buttons.textContent;
  calculationBox.textContent = calculation;

  const hasOperator = operators.some((op) => calculation.includes(op));

  if (hasOperator) {
    try {
      liveAnswerBox.textContent = parseFloat(
        eval(toMathExpression(calculation)).toFixed(3),
      ); // live result
    } catch {
      liveAnswerBox.textContent = "..."; // incomplete expression like "5+"
    }
  }
}

let historyText = document.createElement("p");

function evaluateCalculation() {
  if (!calculation) return;

  try {
    const result = parseFloat(eval(toMathExpression(calculation)).toFixed(3));

    // Save to history array
    history.push({
      operation: calculation,
      result: result,
    });

    localStorage.setItem("history", JSON.stringify(history));

    calculationBox.textContent = result;
    calculation = String(result);
    renderHistory();
  } catch {
    calculationBox.textContent = "Error";
  }
}

isEqualButton.addEventListener("click", () => {
  evaluateCalculation();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    evaluateCalculation();
  }
});

clearButton.addEventListener("click", () => {
  calculation = "";
  calculationBox.textContent = "";
  liveAnswerBox.textContent = "";
});

function renderHistory() {
  historyBox.innerHTML = "";

  history.forEach((entry) => {
    const historyText = document.createElement("p");
    historyText.classList.toggle("history-text");
    historyText.textContent = `${entry.operation} = ${entry.result}`;

    historyBox.appendChild(historyText);
  });
}

clearHistory.addEventListener("click", () => {
  history = [];
  localStorage.removeItem("history");
  historyBox.textContent = "";
});
