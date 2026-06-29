const calculationBox = document.querySelector('.calculation-box');
const isEqualButton = document.querySelector(".is-equal-button");

 let calculation = '';


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
}

isEqualButton.addEventListener('click', () => {
  calculationBox.textContent = eval(toMathExpression(calculation));
})

