const calculator = {
  newNumber  : true,
  hasDecimal : false,
};

wireButtons();

function wireButtons() {
  const btns    = document.querySelectorAll('button');
  const display = document.querySelector('#display');
  const text    = document.querySelector('#display > p');
  
  btns.forEach(btn => {
    if (btn.name === 'number') {
      btn.addEventListener('click', () => {
        if (calculator.newNumber || text.textContent === '0') {
          text.textContent = '';
          calculator.newNumber = false;
        }
        text.textContent += btn.textContent;
        display.appendChild(text);
      });
    } else if (btn.name === 'operator') {
      btn.addEventListener('click', () => {
        calculator.firstNumber = Number(text.textContent);
        calculator.operator    = btn.value;
        readyNew();
        
      });
    } else if (btn.name === 'equals') {
      btn.addEventListener('click', () => {
        text.textContent = 
            operate(calculator.operator, calculator.firstNumber, Number(text.textContent));
        display.appendChild(text);
        readyNew();
      });
    } else if (btn.name === 'decimal') {
      btn.addEventListener('click', () => {
        if(!calculator.hasDecimal) {
          if (calculator.newNumber) {
            text.textContent = '0';
            calculator.newNumber = false;
          }
          text.textContent += btn.textContent;
          display.appendChild(text);
          calculator.hasDecimal = true;
        }
      });
    } else if (btn.name === 'clear') {
      btn.addEventListener('click', () => {
        text.textContent = '0';
        display.appendChild(text);
      });
    }
  });
}

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

function readyNew() {
  calculator.newNumber  = true;
  calculator.hasDecimal = false;
}