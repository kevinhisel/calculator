const display = document.querySelector('#display');
const text    = document.querySelector('#display > p');

const calculator = {
  isNewNumber : true,
  hasDecimal  : false,
};

wireButtons();

function wireButtons() {
  const btns = document.querySelectorAll('button');
  
  btns.forEach(btn => {
    if (btn.name === 'number') {
      btn.addEventListener('click', () => {
        if (calculator.isNewNumber || text.textContent === '0') {
          text.textContent = '';
          calculator.isNewNumber = false;
        }
        printToDisplay(btn.textContent);
      });
    } else if (btn.name === 'operator') {
      btn.addEventListener('click', () => {
        calculator.firstNumber = Number(text.textContent);
        calculator.operator    = btn.value;
        readyNewNumber();
      });
    } else if (btn.name === 'equals') {
      btn.addEventListener('click', () => {
        let tempNum = Number(text.textContent);
        printToDisplay(operate(calculator.operator, calculator.firstNumber, tempNum), false);
        readyNewNumber();
      });
    } else if (btn.name === 'decimal') {
      btn.addEventListener('click', () => {
        if(!calculator.hasDecimal) {
          if (calculator.isNewNumber) {
            text.textContent = '0';
            calculator.isNewNumber = false;
          }
          printToDisplay(btn.textContent);
          calculator.hasDecimal = true;
        }
      });
    } else if (btn.name === 'clear') {
      btn.addEventListener('click', () => {
        printToDisplay('0', false);
        clearVariables();
      });
    }
  });
}

// Math functions 

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
  else return 0;
}

// Functions for readability

function printToDisplay(string, concatenate = true) {
  if (concatenate) text.textContent += string;
  else text.textContent  = string;
  display.appendChild(text);
}

function readyNewNumber() {
  calculator.isNewNumber = true;
  calculator.hasDecimal  = false;
}

function clearVariables() {
  readyNewNumber();
  delete calculator.firstNumber;
  delete calculator.operator;
}