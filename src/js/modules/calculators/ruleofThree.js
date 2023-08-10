class RuleOfThree {
  constructor() {
    this.elementA = document.querySelector('#ruleofthree-a');
    this.elementB = document.querySelector('#ruleofthree-b');
    this.elementC = document.querySelector('#ruleofthree-c');
    this.elementX = document.querySelector('#ruleofthree-x');

    this.buttonCopy = document.querySelector('#copy');

    this.copyButton = this.copyButton.bind(this);
    this.updateResult = this.updateResult.bind(this);

    this.elementError = document.querySelector('.ruleofthree__error');

    this.addEventListeners();
  }

  // Method to calculate the result of the rule of three
  calculate() {
    const a = this.elementA.value;
    const b = this.elementB.value;
    const c = this.elementC.value;

    const result = (b / a) * c;

    return result;
  }

  // Method to copy the result of the rule of three
  async copyButton(e) {
    e.preventDefault();
    if (navigator.clipboard)
      await navigator.clipboard.writeText(this.elementX.value);
  }

  // Method to update the result of the rule of three
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

  // Add/Remove event listeners to the elements
  addEventListeners() {
    this.elementA.addEventListener('input', this.updateResult);
    this.elementB.addEventListener('input', this.updateResult);
    this.elementC.addEventListener('input', this.updateResult);
    this.buttonCopy.addEventListener('click', this.copyButton);
  }

  removeEventListeners() {
    this.elementA.removeEventListener('input', this.updateResult);
    this.elementB.removeEventListener('input', this.updateResult);
    this.elementC.removeEventListener('input', this.updateResult);
    this.buttonCopy.removeEventListener('click', this.copyButton);
  }
}

export default RuleOfThree;
