class TemperatureConverter {
  constructor() {
    this.temperature = {
      fahrenheit: document.getElementById('fahrenheit'),
      celsius: document.getElementById('celsius'),
      kelvin: document.getElementById('kelvin'),
    };
    this.handleConverter = this.handleConverter.bind(this);
    this.addEventListeners();
  }

  handleConverter(e) {
    if (e.target === this.temperature.fahrenheit) {
      this.temperature.celsius.value = (
        (this.temperature.fahrenheit.value - 32) *
        (5 / 9)
      ).toFixed(2);
      this.temperature.kelvin.value = (
        (parseFloat(this.temperature.fahrenheit.value) - 32) * (5 / 9) +
        273.15
      ).toFixed(2);
    } else if (e.target === this.temperature.celsius) {
      this.temperature.fahrenheit.value = (
        this.temperature.celsius.value * (9 / 5) +
        32
      ).toFixed(2);
      this.temperature.kelvin.value = (
        parseFloat(this.temperature.celsius.value) + 273.15
      ).toFixed(2);
    } else if (e.target === this.temperature.kelvin) {
      this.temperature.fahrenheit.value = (
        (this.temperature.kelvin.value - 273.15) * (9 / 5) +
        32
      ).toFixed(2);
      this.temperature.celsius.value = (
        this.temperature.kelvin.value - 273.15
      ).toFixed(2);
    }
  }

  addEventListeners() {
    Object.keys(this.temperature).forEach((key) => {
      this.temperature[key].addEventListener('input', this.handleConverter);
    });
  }

  removeEventListeners() {
    Object.keys(this.temperature).forEach((key) => {
      this.temperature[key].removeEventListener('input', this.handleConverter);
    });
  }
}

export default TemperatureConverter;
