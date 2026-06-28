const calculationBox = document.querySelector('.calculation-box');

 let calculation = '';

const button = document.querySelectorAll(".button");

button.forEach(button => {

  button.addEventListener('click', () => {
    addClickedButton(button);
  });
})

function addClickedButton(button){
 calculation += button.innerHTML;
calculationBox.innerHTML = calculation;
}

