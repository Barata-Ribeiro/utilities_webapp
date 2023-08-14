import { evaluate } from 'mathjs';

/**
 * Class to handle and display calculations entered in a textarea.
 */
class Calculator {
  /**
   * Initializes the class, setting up default properties and initial methods to run.
   */
  constructor() {
    /**
     * @type {HTMLTextAreaElement} Text area for inputting calculations.
     */
    this.calculator = document.querySelector('#calculator-textarea');

    /**
     * @type {HTMLElement} Element to display results of the calculations.
     */
    this.calculatorResult = document.querySelector('#calculator-result');

    this.calculate = this.calculate.bind(this);
    this.calculator.value = localStorage.getItem('calculator') || '';

    this.addEventListeners();
    this.calculate();
  }

  /**
   * Check if a given value is a number.
   * @param {*} value - The value to check.
   * @returns {boolean} True if the value is a number, otherwise false.
   */
  isNumber(value) {
    if (typeof value === 'number')
      return !Number.isNaN(value) && Number.isFinite(value);
    return false;
  }

  /**
   * Rounds a given number to up to 3 decimal places.
   * @param {number} value - The number to round.
   * @returns {number} The rounded number.
   */
  roundNumber(value) {
    return Math.round(value * 1000) / 1000;
  }

  /**
   * Check if a string has balanced parentheses.
   * @param {string} value - The string to check.
   * @returns {boolean} True if the parentheses in the string are balanced, otherwise false.
   */
  isBalanced(value) {
    const stack = [];
    for (let i = 0; i < value.length; i += 1) {
      const char = value[i];
      if (char === '(') stack.push(char);
      else if (char === ')') {
        if (stack.length === 0) return false;
        stack.pop();
      }
    }
    return stack.length === 0;
  }

  /**
   * Calculate and display the result of the inputted calculations.
   */
  calculate() {
    try {
      const validExpr =
        /^(\s*\(*\s*-?\d+(\.\d+)?\s*\)*\s*[\+\-\*\/\^]\s*)*\s*\(*\s*-?\d+(\.\d+)?\s*\)*\s*$/; //eslint-disable-line

      const lines = this.calculator.value.split(/\r?\n/).map((line) => {
        if (validExpr.test(line) && this.isBalanced(line)) {
          try {
            return evaluate(line);
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error(`Failed to evaluate line "${line}": ${err.message}`);
            return NaN;
          }
        } else {
          return NaN;
        }
      });

      this.calculatorResult.innerHTML = `<div>${lines
        .map(
          (l) => `<div>${this.isNumber(l) ? this.roundNumber(l) : '---'}</div>`,
        )
        .join('')}</div>`;

      const total = this.roundNumber(
        lines.filter(this.isNumber).reduce((acc, cur) => acc + cur, 0),
      );

      // Add the total to this.calculatorResult
      this.calculatorResult.innerHTML += `<div class="calculator-result__total" id="total">${total}</div>`;
      localStorage.setItem('calculator', this.calculator.value);
    } catch (err) {
      throw new Error('An error occurred during calculation: ', err);
    }
    this.copyToClipboard();
  }

  /**
   * Enable copying the total calculation result to clipboard by clicking on it.
   */
  copyToClipboard() {
    this.total = document.querySelector('.calculator-result__total');

    if (this.total) {
      this.total.removeEventListener('click', this.copyEventHandler);

      if (this.total.innerText !== '0') {
        this.copyEventHandler = () => {
          navigator.clipboard.writeText(this.total.innerText);
        };
        this.total.addEventListener('click', this.copyEventHandler);
      }
    }
  }

  /** Add event listeners for the calculator textarea. */
  addEventListeners() {
    this.calculator.addEventListener('input', this.calculate);
  }

  /** Remove the event listeners from the calculator textarea. */
  removeEventListeners() {
    this.calculator.removeEventListener('input', this.calculate);

    // check if total element and copyEventHandler function exist
    if (this.total && this.copyEventHandler) {
      this.total.removeEventListener('click', this.copyEventHandler);
    }
  }
}

export default Calculator;
