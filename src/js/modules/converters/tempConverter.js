class TemperatureConverter {
  constructor() {
    this.temperatureUnits = {
      fahrenheit: document.getElementById('fahrenheit'),
      celsius: document.getElementById('celsius'),
      kelvin: document.getElementById('kelvin'),
    };

    this.handleConverter = this.handleConverter.bind(this);

    Object.keys(this.temperatureUnits).forEach((key) => {
      if (Number.isNaN(this.temperatureUnits[key].value)) {
        this.temperatureUnits[key].value = '';
      }
    });

    this.addEventListeners();
  }

  handleConverter(e) {
    const value = parseFloat(e.target.value);
    if (Number.isNaN(value)) {
      Object.keys(this.temperatureUnits).forEach((key) => {
        this.temperatureUnits[key].value = '';
      });
      return;
    }

    try {
      if (e.target === this.temperatureUnits.fahrenheit) {
        this.temperatureUnits.celsius.value = ((value - 32) * (5 / 9)).toFixed(
          2,
        );
        this.temperatureUnits.kelvin.value = (
          (value - 32) * (5 / 9) +
          273.15
        ).toFixed(2);
      } else if (e.target === this.temperatureUnits.celsius) {
        this.temperatureUnits.fahrenheit.value = (value * (9 / 5) + 32).toFixed(
          2,
        );
        this.temperatureUnits.kelvin.value = (value + 273.15).toFixed(2);
      } else if (e.target === this.temperatureUnits.kelvin) {
        if (value < 0) throw new Error('Kelvin cannot be less than 0');
        this.temperatureUnits.fahrenheit.value = (
          (value - 273.15) * (9 / 5) +
          32
        ).toFixed(2);
        this.temperatureUnits.celsius.value = (value - 273.15).toFixed(2);
      }
    } catch (error) {
      throw new Error(`Invalid input: ${error}`);
    }
  }

  addEventListeners() {
    Object.keys(this.temperatureUnits).forEach((key) => {
      this.temperatureUnits[key].addEventListener(
        'input',
        this.handleConverter,
      );
    });
  }

  removeEventListeners() {
    Object.keys(this.temperatureUnits).forEach((key) => {
      this.temperatureUnits[key].removeEventListener(
        'input',
        this.handleConverter,
      );
    });
  }
}

export default TemperatureConverter;
