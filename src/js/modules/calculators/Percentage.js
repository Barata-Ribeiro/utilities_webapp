/* eslint no-param-reassign: "error" */

/**
 * Percentage utility to calculate and display percentage-related calculations.
 */
class Percentage {
  /**
   * Initializes the class, setting up default properties and initial methods to run.
   */
  constructor() {
    this.percentGroups = [
      {
        xValue: document.querySelector('#xValueOne'),
        yValue: document.querySelector('#yValueOne'),
        result: document.querySelector('#percent-result-one'),
        calculator: this.calculatePercentageResult.bind(this),
      },
      {
        xValue: document.querySelector('#xValueTwo'),
        yValue: document.querySelector('#yValueTwo'),
        result: document.querySelector('#percent-result-two'),
        calculator: this.calculateWhatPercentXisOfY.bind(this),
      },
      {
        xValue: document.querySelector('#xValueThree'),
        yValue: document.querySelector('#yValueThree'),
        result: document.querySelector('#percent-result-three'),
        calculator: this.calculateYisXPercentOfWhat.bind(this),
      },
    ];

    this.addEventListeners();
  }

  /**
   * Retrieves the values of x and y from the given group and checks if they are valid numbers.
   *
   * @param {Object} group - The percent group containing xValue and yValue.
   * @returns {Object} An object containing xValue, yValue, and a validity flag.
   */
  getValues(group) {
    const xValue = parseFloat(group.xValue.value);
    const yValue = parseFloat(group.yValue.value);

    if (Number.isNaN(xValue) || Number.isNaN(yValue)) {
      return { isValid: false };
    }

    return { xValue, yValue, isValid: true };
  }

  /**
   * Sets multiline text for an element using text nodes and line break elements.
   *
   * @param {HTMLElement} element - The target element.
   * @param {string} text - The multiline text (separated by '\n').
   */
  setMultilineText(element, text) {
    element.textContent = '';

    const lines = text.split('\n');

    lines.forEach((line, index) => {
      const textNode = document.createTextNode(line);
      element.appendChild(textNode);

      if (index !== lines.length - 1) {
        const breakNode = document.createElement('br');
        element.appendChild(breakNode);
      }
    });
  }

  /**
   * Calculates the result based on the formula: (x / 100) * y
   * and displays it in the group's result.
   *
   * @param {Object} group - The percent group containing xValue, yValue, and result.
   */
  calculatePercentageResult(group) {
    const { xValue, yValue, isValid } = this.getValues(group);
    if (!isValid) return;

    const result = (xValue / 100) * yValue;
    this.setMultilineText(
      group.result,
      `${result.toFixed(2)}
Steps: ${xValue} / ${yValue} = ${result.toFixed(2)}`,
    );
  }

  /**
   * Calculates what percentage x is of y using the formula: (x / y) * 100
   * and displays it in the group's result.
   *
   * @param {Object} group - The percent group containing xValue, yValue, and result.
   */
  calculateWhatPercentXisOfY(group) {
    const { xValue, yValue, isValid } = this.getValues(group);
    if (!isValid) return;

    const result = (xValue / yValue) * 100;
    this.setMultilineText(
      group.result,
      `${result.toFixed(2)}%
Steps: ${xValue} / ${yValue} = ${result / 100} = ${result.toFixed(2)}%`,
    );
  }

  /**
   * Calculates the result based on the formula: (y * 100) / x
   * and displays it in the group's result.
   *
   * @param {Object} group - The percent group containing xValue, yValue, and result.
   */
  calculateYisXPercentOfWhat(group) {
    const { xValue, yValue, isValid } = this.getValues(group);
    if (!isValid) return;

    const result = (yValue * 100) / xValue;
    this.setMultilineText(
      group.result,
      `${result.toFixed(2)}
Steps: ${yValue} / ${xValue}% = ${result.toFixed(2)}`,
    );
  }

  /**
   * Adds event listeners to the xValue and yValue fields of each percent group.
   */
  addEventListeners() {
    this.percentGroups.forEach((group) => {
      const xListener = () => group.calculator(group);
      const yListener = () => group.calculator(group);

      group.xValue?.addEventListener('input', xListener);
      group.yValue?.addEventListener('input', yListener);
      group.xListener = xListener;
      group.yListener = yListener;
    });
  }

  /**
   * Removes the event listeners from the xValue and yValue fields of each percent group.
   */
  removeEventListeners() {
    this.percentGroups.forEach((group) => {
      group.xValue?.removeEventListener('input', group.xListener);
      group.yValue?.removeEventListener('input', group.yListener);
    });
  }
}

export default Percentage;
