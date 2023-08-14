/**
 * A class to handle unit conversion based on conversion factors.
 */
class Converter {
  /**
   * Initializes the class, setting up default properties and initial methods to run.
   * Creates a new Converter instance.
   * @param {Object} units - A collection of units with associated DOM elements for input.
   * @param {Object} conversionFactor - A matrix of conversion factors between units.
   */
  constructor(units, conversionFactor) {
    this.units = units;
    this.conversionFactor = conversionFactor;
    this.handleConverter = this.handleConverter.bind(this);

    Object.keys(this.units).forEach((key) => {
      if (Number.isNaN(this.units[key].value)) {
        this.units[key].value = '';
      }
    });

    this.addEventListeners();
  }

  /**
   * Converts a value from one unit to another.
   * @param {string} from - The starting unit.
   * @param {string} to - The target unit.
   * @param {number} value - The value to be converted.
   * @returns {number} The converted value.
   */
  convertFromTo(from, to, value) {
    return value * this.conversionFactor[from][this.getUnitIndex(to)];
  }

  /**
   * Retrieves the index of a unit in the units collection.
   * @param {string} unit - The unit to find the index for.
   * @returns {number} The index of the unit.
   */
  getUnitIndex(unit) {
    return Object.keys(this.units).indexOf(unit);
  }

  /**
   * Handles the conversion logic when an input value changes.
   * @param {Event} e - The DOM event triggered by input change.
   */
  handleConverter(e) {
    const from = e.target.id;
    const value = parseFloat(e.target.value);

    if (Number.isNaN(value)) {
      Object.keys(this.units).forEach((key) => {
        this.units[key].value = '';
      });
      return;
    }

    Object.keys(this.units).forEach((key) => {
      if (key !== from) {
        const to = key;
        try {
          const convertedValue = this.convertFromTo(from, to, value);
          if (Number.isNaN(convertedValue))
            throw new Error('Invalid value entered');
          this.units[to].value = convertedValue;
        } catch (error) {
          throw new Error(`Invalid input: ${error}`);
        }
      }
    });
  }

  /**
   * Adds event listeners to each unit input for conversion on change.
   */
  addEventListeners() {
    Object.keys(this.units).forEach((key) => {
      this.units[key].addEventListener('input', this.handleConverter);
    });
  }

  /**
   * Removes event listeners from each unit input.
   */
  removeEventListeners() {
    Object.keys(this.units).forEach((key) => {
      this.units[key].removeEventListener('input', this.handleConverter);
    });
  }
}

export default Converter;
