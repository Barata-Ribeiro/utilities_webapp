class RuleOfThree {
  constructor() {
    this.elementA = document.querySelector('#ruleofthree-a');
    this.elementB = document.querySelector('#ruleofthree-b');
    this.elementC = document.querySelector('#ruleofthree-c');
    this.elementX = document.querySelector('#ruleofthree-x');

    this.buttonCopy = document.querySelector('#copy');

    this.copyPassword = this.copyPassword.bind(this);
    this.updateResult = this.updateResult.bind(this);

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

  async copyPassword(e) {
    e.preventDefault();
    if (navigator.clipboard)
      await navigator.clipboard.writeText(this.elementX.value);
  }

  addEventListeners() {
    this.elementA.addEventListener('input', this.updateResult);
    this.elementB.addEventListener('input', this.updateResult);
    this.elementC.addEventListener('input', this.updateResult);
    this.buttonCopy.addEventListener('click', this.copyPassword);
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

  removeEventListeners() {
    this.elementA.removeEventListener('input', this.updateResult);
    this.elementB.removeEventListener('input', this.updateResult);
    this.elementC.removeEventListener('input', this.updateResult);
    this.buttonCopy.removeEventListener('click', this.copyPassword);
  }
}

export default RuleOfThree;
