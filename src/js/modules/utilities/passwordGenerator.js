class PasswordGenerator {
  constructor() {
    this.form_el = document.querySelector('#passwordGenerator');
    this.password_el = document.querySelector('#passwordResult');
    this.length_el = document.querySelector('#passwordLength');
    this.uppercase_el = document.querySelector('#passwordUppercase');
    this.lowercase_el = document.querySelector('#passwordLowercase');
    this.numbers_el = document.querySelector('#passwordNumbers');
    this.symbols_el = document.querySelector('#passwordSymbols');

    this.generate_btn = document.querySelector('#passwordGenerate');
    this.copy_btn = document.querySelector('#copy');

    this.generatePassword = this.generatePassword.bind(this);
    this.copyPassword = this.copyPassword.bind(this);

    this.uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    this.numbers = '0123456789';
    this.symbols = '!@#$%^&*()+';

    this.addEventListeners();
  }

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
      } while (
        password.charAt(password.length - 1) === randomChar &&
        chars.length > 1
      );
      password += randomChar;
    }

    this.password_el.value = password;
  }

  async copyPassword(e) {
    e.preventDefault();
    if (navigator.clipboard)
      await navigator.clipboard.writeText(this.password_el.value);
  }

  addEventListeners() {
    this.form_el.addEventListener('submit', this.generatePassword);
    this.copy_btn.addEventListener('click', this.copyPassword);
  }

  removeEventListeners() {
    this.form_el.removeEventListener('submit', this.generatePassword);
    this.copy_btn.removeEventListener('click', this.copyPassword);
  }
}

export default PasswordGenerator;
