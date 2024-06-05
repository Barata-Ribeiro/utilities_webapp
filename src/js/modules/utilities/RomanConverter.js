/**
 * Class for converting between Roman and Arabic numerals.
 */
class RomanConverter {
  /**
   * Initializes the class, setting up default properties and initial methods to run.
   */
  constructor() {
    /** @type {HTMLElement} Input element for Roman numerals. */
    this.romanInput = document.querySelector('#roman-numerals');

    /** @type {HTMLElement} Input element for Arabic numerals. */
    this.arabicInput = document.querySelector('#arabic-numerals');

    /** @type {HTMLElement} Button to trigger conversion to Arabic. */
    this.toArabicBtn = document.querySelector('#convert_to_arabic');

    /** @type {HTMLElement} Button to trigger conversion to Roman. */
    this.toRomanBtn = document.querySelector('#convert_to_roman');

    /** @type {HTMLElement} Display element for error messages. */
    this.elementError = document.querySelector('.roman-converter__error');

    /** @type {string[]} Array of Roman numerals from largest to smallest. */
    this.romanNumerals = [
      'M',
      'CM',
      'D',
      'CD',
      'C',
      'XC',
      'L',
      'XL',
      'X',
      'IX',
      'V',
      'IV',
      'I',
    ];

    /** @type {number[]} Array of Arabic numerals corresponding to the Roman numerals. */
    this.arabicNumerals = [
      1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1,
    ];

    this.handleRomanButtonClick = this.handleRomanButtonClick.bind(this);
    this.handleArabicButtonClick = this.handleArabicButtonClick.bind(this);

    this.addEventListeners();
  }

  /**
   * Convert a Roman numeral string to its Arabic numeral equivalent.
   *
   * @param {string} romanStr - The Roman numeral string.
   * @returns {number} - The corresponding Arabic numeral.
   */
  romanToArabic(romanStr) {
    let num = 0;
    let i = 0;
    let roman = romanStr; // new local variable
    while (roman.length > 0 && i < this.romanNumerals.length) {
      if (roman.startsWith(this.romanNumerals[i])) {
        num += this.arabicNumerals[i];
        roman = roman.slice(this.romanNumerals[i].length);
      } else i += 1;
    }
    return num;
  }

  /**
   * Convert an Arabic numeral to its Roman numeral equivalent.
   *
   * @param {number} arabicNum - The Arabic numeral.
   * @returns {string} - The corresponding Roman numeral.
   */
  arabicToRoman(arabicNum) {
    let roman = '';
    let i = 0;
    let arabic = arabicNum; // new local variable
    while (arabic > 0 && i < this.arabicNumerals.length) {
      if (arabic >= this.arabicNumerals[i]) {
        roman += this.romanNumerals[i];
        arabic -= this.arabicNumerals[i];
      } else i += 1;
    }
    return roman;
  }

  /** Handle the conversion from Arabic to Roman when the corresponding button is clicked. */
  handleRomanButtonClick() {
    // Check if the Arabic input string contains only digits
    if (!/^\d+$/.test(this.arabicInput.value)) {
      this.elementError.style.display = 'block';
      this.elementError.textContent = 'Please enter a valid Arabic numeral.';
      return;
    }

    if (Number(this.arabicInput.value) > 3888) {
      this.elementError.style.display = 'block';
      this.elementError.textContent = "You can't convert more than 3,888.";
      return;
    }

    this.elementError.style.display = 'none';
    this.elementError.textContent = '';

    this.romanInput.value = this.arabicToRoman(Number(this.arabicInput.value));
  }

  /** Handle the conversion from Roman to Arabic when the corresponding button is clicked. */
  handleArabicButtonClick() {
    // Check if the Roman input string only contains valid Roman numerals
    if (!/^[IVXLCDMivxlcdm]+$/.test(this.romanInput.value)) {
      this.elementError.style.display = 'block';
      this.elementError.textContent = 'Please enter a valid Roman numeral.';
      return;
    }

    this.elementError.style.display = 'none';
    this.elementError.textContent = '';

    // Convert the Roman input string to uppercase
    const romanUpper = this.romanInput.value.toUpperCase();

    this.arabicInput.value = this.romanToArabic(romanUpper);
  }

  /** Add event listeners to trigger conversions when buttons are clicked. */
  addEventListeners() {
    this.toArabicBtn.addEventListener('click', this.handleArabicButtonClick);
    this.toRomanBtn.addEventListener('click', this.handleRomanButtonClick);
  }

  /** Remove event listeners from the conversion buttons. */
  removeEventListeners() {
    this.toArabicBtn.removeEventListener('click', this.handleArabicButtonClick);
    this.toRomanBtn.removeEventListener('click', this.handleRomanButtonClick);
  }
}

export default RomanConverter;
