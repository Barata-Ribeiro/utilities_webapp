class CharacterCounter {
  constructor() {
    this.textArea = document.getElementById('text-area');

    this.handleCounting = this.handleCounting.bind(this);

    this.addEventListeners();
  }

  handleCounting() {
    const charCount = this.textArea.value.replace(/\s+/g, '').length;
    document.getElementById(
      'charResult',
    ).textContent = `${charCount} characters.`;
  }

  addEventListeners() {
    this.textArea.addEventListener('input', this.handleCounting);
  }

  removeEventListeners() {
    this.textArea.removeEventListener('input', this.handleCounting);
  }
}

export default CharacterCounter;
