/**
 * Class to handle and display the calculations for the Rule of Three.
 */
class RuleOfThree {
  /**
   * Initializes the class, setting up default properties and initial methods to run.
   */
  constructor() {
    /**
     * @type {HTMLInputElement} Input element for the value of 'a' in the rule of three.
     */
    this.elementA = document.querySelector('#ruleofthree-a');

    /**
     * @type {HTMLInputElement} Input element for the value of 'b' in the rule of three.
     */
    this.elementB = document.querySelector('#ruleofthree-b');

    /**
     * @type {HTMLInputElement} Input element for the value of 'c' in the rule of three.
     */
    this.elementC = document.querySelector('#ruleofthree-c');

    /**
     * @type {HTMLInputElement} Input element to display the result 'x' in the rule of three.
     */
    this.elementX = document.querySelector('#ruleofthree-x');

    /**
     * @type {HTMLButtonElement} Button element to copy the result 'x' to clipboard.
     */
    this.buttonCopy = document.querySelector('#copy');

    this.copyButton = this.copyButton.bind(this);
    this.updateResult = this.updateResult.bind(this);

    /**
     * @type {HTMLElement} Element to display error messages related to input values.
     */
    this.elementError = document.querySelector('.ruleofthree__error');

    this.addEventListeners();
  }

  /**
   * Calculates the result based on the rule of three.
   * @returns {number} The calculated result.
   */
  calculate() {
    const a = this.elementA.value;
    const b = this.elementB.value;
    const c = this.elementC.value;

    return (b / a) * c;
  }

  /**
   * Copies the result 'x' to the clipboard.
   * @param {Event} e - The triggered event.
   */
  async copyButton(e) {
    e.preventDefault();
    if (navigator.clipboard)
      await navigator.clipboard.writeText(this.elementX.value);
  }

  /**
   * Updates and displays the result 'x' based on the inputted values.
   */
  updateResult() {
    if (
      this.elementA.value === '0' ||
      this.elementB.value === '0' ||
      this.elementC.value === '0'
    ) {
      this.elementX.value = '0';
      this.elementError.style.display = 'block';
      this.elementError.textContent = 'The values cannot be zero.';
      this.buttonCopy.disabled = true;
    } else {
      this.elementError.style.display = 'none';

      if (this.elementA.value && this.elementB.value && this.elementC.value) {
        const result = this.calculate();
        this.elementX.value = parseFloat(result).toFixed(3);
        this.buttonCopy.disabled = false;
      }
    }
  }

  /**
   * Add event listeners to the relevant input elements and the copy button.
   */
  addEventListeners() {
    this.elementA.addEventListener('input', this.updateResult);
    this.elementB.addEventListener('input', this.updateResult);
    this.elementC.addEventListener('input', this.updateResult);
    this.buttonCopy.addEventListener('click', this.copyButton);
  }

  /**
   * Remove event listeners from the relevant input elements and the copy button.
   */
  removeEventListeners() {
    this.elementA.removeEventListener('input', this.updateResult);
    this.elementB.removeEventListener('input', this.updateResult);
    this.elementC.removeEventListener('input', this.updateResult);
    this.buttonCopy.removeEventListener('click', this.copyButton);
  }
}

export default RuleOfThree;
