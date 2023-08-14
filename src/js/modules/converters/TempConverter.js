import Converter from './Converter';

/**
 * TemperatureConverter class for converting between various temperature units.
 * @extends Converter
 */
class TemperatureConverter extends Converter {
  /**
   * Constructs a new TemperatureConverter.
   */
  constructor() {
    const temperatureUnits = {
      fahrenheit: document.getElementById('fahrenheit'),
      celsius: document.getElementById('celsius'),
      kelvin: document.getElementById('kelvin'),
    };
    super(temperatureUnits);

    this.conversionFactor = {
      fahrenheit: {
        fahrenheit: (value) => value,
        celsius: (value) => (value - 32) * (5 / 9),
        kelvin: (value) => (value - 32) * (5 / 9) + 273.15,
      },
      celsius: {
        fahrenheit: (value) => value * (9 / 5) + 32,
        celsius: (value) => value,
        kelvin: (value) => value + 273.15,
      },
      kelvin: {
        fahrenheit: (value) => (value - 273.15) * (9 / 5) + 32,
        celsius: (value) => value - 273.15,
        kelvin: (value) => value,
      },
    };
  }

  /**
   * Converts a given value from one temperature unit to another.
   * @param {string} from - The unit to convert from.
   * @param {string} to - The unit to convert to.
   * @param {number} value - The value to convert.
   * @returns {number} - The converted value.
   */
  convertFromTo(from, to, value) {
    return this.conversionFactor[from][to](value);
  }
}

export default TemperatureConverter;
