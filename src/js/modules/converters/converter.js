class Converter {
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

  convertFromTo(from, to, value) {
    return value * this.conversionFactor[from][this.getUnitIndex(to)];
  }

  getUnitIndex(unit) {
    return Object.keys(this.units).indexOf(unit);
  }

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

  addEventListeners() {
    Object.keys(this.units).forEach((key) => {
      this.units[key].addEventListener('input', this.handleConverter);
    });
  }

  removeEventListeners() {
    Object.keys(this.units).forEach((key) => {
      this.units[key].removeEventListener('input', this.handleConverter);
    });
  }
}

export default Converter;
