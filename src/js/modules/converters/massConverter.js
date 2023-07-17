class MassConverter {
  constructor() {
    this.massUnits = {
      tonne: document.getElementById('tonne'),
      kilogram: document.getElementById('kilogram'),
      gram: document.getElementById('gram'),
      milligram: document.getElementById('milligram'),
      microgram: document.getElementById('microgram'),
      ukTon: document.getElementById('ukTon'),
      usTon: document.getElementById('usTon'),
      pound: document.getElementById('pound'),
      ounce: document.getElementById('ounce'),
    };

    this.handleConverter = this.handleConverter.bind(this);

    Object.keys(this.massUnits).forEach((key) => {
      if (Number.isNaN(this.massUnits[key].value)) {
        this.massUnits[key].value = '';
      }
    });

    this.conversionFactor = {
      tonne: [1, 1e3, 1e6, 1e9, 1e12, 0.984207, 1.10231, 2204.623, 35273.96],
      kilogram: [
        1e-3, 1, 1e3, 1e6, 1e9, 0.000984207, 0.00110231, 2.204623, 35.27396,
      ],
      gram: [
        1e-6, 1e-3, 1, 1e3, 1e6, 9.8421e-7, 1.1023e-6, 0.002204623, 0.03527396,
      ],
      milligram: [
        1e-9, 1e-6, 1e-3, 1, 1e3, 9.8421e-10, 1.1023e-9, 2.2046e-6, 3.5274e-5,
      ],
      microgram: [
        1e-12, 1e-9, 1e-6, 1e-3, 1, 9.8421e-13, 1.1023e-12, 2.2046e-9,
        3.5274e-8,
      ],
      ukTon: [1.016, 1016, 1.016e6, 1.016e9, 1.016e12, 1, 1.12, 2240, 35840],
      usTon: [
        0.907185, 907.185, 907185, 9.07185e8, 9.07185e11, 0.8928571, 1, 2000,
        32000,
      ],
      pound: [
        0.000453592, 0.453592, 453.592, 453592, 4.536e8, 0.0004464286, 0.0005,
        1, 16,
      ],
      ounce: [
        2.83495e-5, 0.0283495, 28.3495, 28349.5, 2.83495e7, 2.79018e-5,
        3.125e-5, 0.0625, 1,
      ],
    };

    this.addEventListeners();
  }

  convertFromTo(from, to, value) {
    return value * this.conversionFactor[from][this.getUnitIndex(to)];
  }

  getUnitIndex(unit) {
    return Object.keys(this.massUnits).indexOf(unit);
  }

  handleConverter(e) {
    const from = e.target.id;
    const value = parseFloat(e.target.value);

    if (Number.isNaN(value)) {
      Object.keys(this.massUnits).forEach((key) => {
        this.massUnits[key].value = '';
      });
      return;
    }

    Object.keys(this.massUnits).forEach((key) => {
      if (key !== from) {
        const to = key;
        try {
          const convertedValue = this.convertFromTo(from, to, value);
          if (Number.isNaN(convertedValue))
            throw new Error('Invalid value entered');
          this.massUnits[to].value = convertedValue;
        } catch (error) {
          throw new Error(`Invalid input: ${error}`);
        }
      }
    });
  }

  addEventListeners() {
    Object.keys(this.massUnits).forEach((key) => {
      this.massUnits[key].addEventListener('input', this.handleConverter);
    });
  }

  removeEventListeners() {
    Object.keys(this.massUnits).forEach((key) => {
      this.massUnits[key].removeEventListener('input', this.handleConverter);
    });
  }
}

export default MassConverter;
