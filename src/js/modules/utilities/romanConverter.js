class RomanConverter {
  constructor() {
    this.romanInput = document.querySelector('#roman-numerals');
    this.arabicInput = document.querySelector('#arabic-numerals');

    this.toArabicBtn = document.querySelector('#convert_to_arabic');
    this.toRomanBtn = document.querySelector('#convert_to_roman');

    this.elementError = document.querySelector('.roman-converter__error');

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

    this.arabicNumerals = [
      1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1,
    ];

    this.handleRomanButtonClick = this.handleRomanButtonClick.bind(this);
    this.handleArabicButtonClick = this.handleArabicButtonClick.bind(this);

    this.addEventListeners();
  }

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

    const roman = this.arabicToRoman(Number(this.arabicInput.value));
    this.romanInput.value = roman;
  }

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

    const arabic = this.romanToArabic(romanUpper);
    this.arabicInput.value = arabic;
  }

  addEventListeners() {
    this.toArabicBtn.addEventListener('click', this.handleArabicButtonClick);
    this.toRomanBtn.addEventListener('click', this.handleRomanButtonClick);
  }

  removeEventListeners() {
    this.toArabicBtn.removeEventListener('click', this.handleArabicButtonClick);
    this.toRomanBtn.removeEventListener('click', this.handleRomanButtonClick);
  }
}

export default RomanConverter;
