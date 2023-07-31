class RuleOfThree {
  constructor() {
    this.elementA = document.querySelector('#ruleofthree-a');
    this.elementB = document.querySelector('#ruleofthree-b');
    this.elementC = document.querySelector('#ruleofthree-c');
    this.elementX = document.querySelector('#ruleofthree-x');

    this.elementError = document.querySelector('.ruleofthree__error');

    this.addEventListeners();
  }

  calculate() {
    const a = this.elementA.value;
    const b = this.elementB.value;
    const c = this.elementC.value;

    const result = (b / a) * c;

    return result;
  }

  addEventListeners() {
    this.elementA.addEventListener('input', () => this.updateResult());
    this.elementB.addEventListener('input', () => this.updateResult());
    this.elementC.addEventListener('input', () => this.updateResult());
  }

  updateResult() {
    if (
      this.elementA.value === '0' ||
      this.elementB.value === '0' ||
      this.elementC.value === '0'
    ) {
      this.elementX.value = '0';
      this.elementError.style.display = 'block';
      this.elementError.textContent = 'The values cannot be zero.';
    } else {
      this.elementError.style.display = 'none';

      if (this.elementA.value && this.elementB.value && this.elementC.value) {
        const result = this.calculate();
        this.elementX.value = parseFloat(result).toFixed(3);
      }
    }
  }

  removeEventListeners() {
    this.elementA.removeEventListener('input', () => this.updateResult());
    this.elementB.removeEventListener('input', () => this.updateResult());
    this.elementC.removeEventListener('input', () => this.updateResult());
  }
}

export default RuleOfThree;
