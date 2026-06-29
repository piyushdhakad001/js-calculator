const calculationBox = document.querySelector('.calculation-box');
const liveAnswerBox = document.querySelector('.answer-box');
const clearButton = document.querySelector(".clear-button");
const isEqualButton = document.querySelector(".is-equal-button");

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

isEqualButton.addEventListener('click', () => {
  calculationBox.textContent = eval(toMathExpression(calculation));
})

clearButton.addEventListener('click', () => {
  calculation = ''
   calculationBox.textContent = '';
   liveAnswerBox.textContent = '';
});