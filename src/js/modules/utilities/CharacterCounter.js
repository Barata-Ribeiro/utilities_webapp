/**
 * Class for counting and displaying the number of characters in a text area.
 */
class CharacterCounter {
  /**
   * Initializes the class, setting up default properties and initial methods to run.
   */
  constructor() {
    /**
     * @type {HTMLTextAreaElement} Text area element for which character count is determined.
     */
    this.textArea = document.getElementById('text-area');

    this.handleCounting = this.handleCounting.bind(this);

    this.addEventListeners();
  }

  /**
   * Calculates and displays the number of non-space characters in the text area.
   */
  handleCounting() {
    const charCount = this.textArea.value.replace(/\s+/g, '').length;
    document.getElementById('charResult').textContent =
      `${charCount} characters.`;
  }

  /** Add an event listener for text input in the text area. */
  addEventListeners() {
    this.textArea.addEventListener('input', this.handleCounting);
  }

  /** Remove the event listener for text input in the text area. */
  removeEventListeners() {
    this.textArea.removeEventListener('input', this.handleCounting);
  }
}

export default CharacterCounter;
