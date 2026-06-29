const calculationBox = document.querySelector('.calculation-box');
const liveAnswerBox = document.querySelector('.answer-box');
const clearButton = document.querySelector(".clear-button");
const isEqualButton = document.querySelector(".is-equal-button");
let historyBox = document.querySelector(".history-box");


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

// LONG CODE
//  let hasOperator = false;
// for(let i = 0; i < operators.length; i++) {
//   if(calculation.includes(operators[i])) {
//     hasOperator = true;
//     break;
//   }
// }

// SHORTHAND
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
let history = [];

isEqualButton.addEventListener('click', () => {
try{
  const result = eval(toMathExpression(calculation));

  // save to history array
  history.push({
    operation: calculation,
    result: result
  })
  calculationBox.textContent = result;
  calculation = String(result);
  liveAnswerBox.textContent = '';
   renderHistory();
} catch {
 calculationBox.textContent = 'Error';
}

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


clearButton.addEventListener('click', () => {
  calculation = ''
   calculationBox.textContent = '';
   liveAnswerBox.textContent = '';
});


