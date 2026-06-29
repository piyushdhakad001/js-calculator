const calculationBox = document.querySelector('.calculation-box');
const liveAnswerBox = document.querySelector('.answer-box');
const clearButton = document.querySelector(".clear-button");
const isEqualButton = document.querySelector(".is-equal-button");
let historyBox = document.querySelector(".history-box");
const clearHistory = document.querySelector(".clear-history")

let history = JSON.parse(localStorage.getItem("history")) || [];

renderHistory();


 let calculation = '';
const operators = ['+', '÷', '×', '−'];

const button = document.querySelectorAll(".button");

button.forEach(button => {
  button.addEventListener('click', () => {
    addClickedButton(button);
  });
})


function toMathExpression(str){
 return str
 .replace(/×/g, '*')
 .replace(/÷/g, '/')
 .replace(/−/g, '-');
}

function addClickedButton(button){
 calculation += button.textContent;
calculationBox.textContent = calculation;

const hasOperator = operators.some(op =>
calculation.includes(op)
 );

  if (hasOperator) {
    try {
      liveAnswerBox.textContent = eval(toMathExpression(calculation)); // live result
    } catch {
      liveAnswerBox.textContent = '...'; // incomplete expression like "5+"
    }
  }
}

let historyText = document.createElement('p');

isEqualButton.addEventListener('click', () => {
try{
  const result = eval(toMathExpression(calculation));

  // save to history array
  history.push({
    operation: calculation,
    result: result
  })

  localStorage.setItem("history", JSON.stringify(history));

  calculationBox.textContent = result;
  calculation = String(result);
  // calculationBox.textContent = '';
  // liveAnswerBox.textContent = '';
   renderHistory();
} catch {
 calculationBox.textContent = 'Error';
}

});

clearButton.addEventListener('click', () => {
  calculation = ''
   calculationBox.textContent = '';
   liveAnswerBox.textContent = '';
});

function renderHistory(){
  historyBox.innerHTML = '';

  history.forEach(entry => {
    const historyText = document.createElement('p');
    historyText.classList.toggle('history-text');
    historyText.textContent = `${entry.operation} = ${entry.result}`;
    
    historyBox.appendChild(historyText);
  });
}

clearHistory.addEventListener('click', () => {
  localStorage.removeItem("history");
  historyBox.textContent = '';
})




