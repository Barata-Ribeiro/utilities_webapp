/**
 * Class for generating and managing passwords.
 */
class PasswordGenerator {
  /**
   * Initializes the class, setting up default properties and initial methods to run.
   */
  constructor() {
    /** @type {HTMLElement} Form element for password generator settings. */
    this.form_el = document.querySelector('#passwordGenerator');

    /** @type {HTMLElement} Input element displaying the generated password. */
    this.password_el = document.querySelector('#passwordResult');

    /** @type {HTMLElement} Input element for defining password length. */
    this.length_el = document.querySelector('#passwordLength');

    /** @type {HTMLElement} Checkbox for including uppercase letters in the password. */
    this.uppercase_el = document.querySelector('#passwordUppercase');

    /** @type {HTMLElement} Checkbox for including lowercase letters in the password. */
    this.lowercase_el = document.querySelector('#passwordLowercase');

    /** @type {HTMLElement} Checkbox for including numbers in the password. */
    this.numbers_el = document.querySelector('#passwordNumbers');

    /** @type {HTMLElement} Checkbox for including symbols in the password. */
    this.symbols_el = document.querySelector('#passwordSymbols');

    /** @type {HTMLElement} Button to trigger password generation. */
    this.generate_btn = document.querySelector('#passwordGenerate');

    /** @type {HTMLElement} Button to copy the generated password. */
    this.copy_btn = document.querySelector('#copy');

    this.generatePassword = this.generatePassword.bind(this);
    this.copyPassword = this.copyPassword.bind(this);

    /** @type {string} Uppercase letters set for password generation. */
    this.uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    /** @type {string} Lowercase letters set for password generation. */
    this.lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';

    /** @type {string} Numbers set for password generation. */
    this.numbers = '0123456789';

    /** @type {string} Symbols set for password generation. */
    this.symbols = '!@#$%^&*()+';

    this.addEventListeners();
  }

  /**
   * Generate a password based on user-selected criteria.
   *
   * @param {Event} [e] - The submit event (if invoked from form submission).
   */
  generatePassword(e) {
    if (e instanceof Event) e.preventDefault();
    let password = '';
    let length = this.length_el.value;

    if (length < 1) length = 1;
    if (length > 50) length = 50;

    let chars = '';

    chars += this.uppercase_el.checked ? this.uppercaseLetters : '';
    chars += this.lowercase_el.checked ? this.lowercaseLetters : '';
    chars += this.numbers_el.checked ? this.numbers : '';
    chars += this.symbols_el.checked ? this.symbols : '';

    for (let i = 0; i < length; i += 1) {
      let randomChar;
      do {
        const random = Math.floor(Math.random() * chars.length);
        randomChar = chars.charAt(random);
      } while (password.endsWith(randomChar) && chars.length > 1);
      password += randomChar;
    }

    this.password_el.value = password;
  }

  /**
   * Copy the generated password to the clipboard.
   *
   * @param {Event} e - The click event.
   */
  async copyPassword(e) {
    e.preventDefault();
    if (navigator.clipboard)
      await navigator.clipboard.writeText(this.password_el.value);
  }

  /** Add event listeners for generating and copying passwords. */
  addEventListeners() {
    this.form_el.addEventListener('submit', this.generatePassword);
    this.copy_btn.addEventListener('click', this.copyPassword);
  }

  /** Remove event listeners for generating and copying passwords. */
  removeEventListeners() {
    this.form_el.removeEventListener('submit', this.generatePassword);
    this.copy_btn.removeEventListener('click', this.copyPassword);
  }
}

export default PasswordGenerator;
