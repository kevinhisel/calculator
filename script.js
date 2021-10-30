const display  = document.querySelector('#display');
const text     = document.querySelector('#display > p');
const oBtns    = Array.from(document.querySelectorAll("button[name='operator']"));

const calculator = {
  isNewNumber    : true,
  hasDecimal     : false,
  operatorActive : false,
};

wireButtons();

function wireButtons() {
  const btns = document.querySelectorAll('button');
  
  btns.forEach(btn => {
    if (btn.name === 'number') {
      btn.addEventListener('click', () => {
        if (calculator.isNewNumber || text.textContent === '0') {
          text.textContent = '';
          if (calculator.isNewNumber){
            calculator.isNewNumber = false;
            setOperatorInactive();
          }
        }
        printToDisplay(btn.textContent);
      });
    } else if (btn.name === 'operator') {
      btn.addEventListener('click', () => {
        setOperatorInactive();
        // if operator exists then savedNumber also exists and there shouldn't be logic errors
        if ( 'operator' in calculator && !calculator.isNewNumber) printSolution();
        calculator.savedNumber = Number(text.textContent);
        calculator.operator    = btn.value;
        setOperatorActive(btn)
        readyNewNumber();
      });
    } else if (btn.name === 'equals') {
      btn.addEventListener('click', () => {
        setOperatorInactive();
        printSolution();
        readyNewNumber();
        delete calculator.operator;
      });
    } else if (btn.name === 'decimal') {
      btn.addEventListener('click', () => {
        if(!calculator.hasDecimal) {
          if (calculator.isNewNumber) {
            setOperatorInactive();
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
        setOperatorInactive();
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

function setOperatorInactive() {
  if (calculator.operatorActive) {
    oBtns[oBtns.findIndex(oBtn => oBtn.classList.contains('active'))].classList.toggle('active');
  }
  calculator.operatorActive = false;
}

function setOperatorActive(btn) {
  btn.classList.toggle('active');
  calculator.operatorActive = true; 
}

function printSolution() {
  let tempNum = Number(text.textContent);
  printToDisplay(operate(calculator.operator, calculator.savedNumber, tempNum), false);
}

function readyNewNumber() {
  calculator.isNewNumber = true;
  calculator.hasDecimal  = false;
}

function clearVariables() {
  readyNewNumber();
  delete calculator.savedNumber;
  delete calculator.operator;
}