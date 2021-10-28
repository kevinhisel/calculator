const btns    = document.querySelectorAll('.numeral');
const display = document.querySelector('#display');
const text    = document.createElement('p');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    text.textContent += btn.textContent;
    display.appendChild(text);
  });
})

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  if      (operator === '+') return add(a, b);
  else if (operator === '-') return subtract(a, b);
  else if (operator === '*') return multiply(a, b);
  else if (operator === '/') return divide(a, b);
}