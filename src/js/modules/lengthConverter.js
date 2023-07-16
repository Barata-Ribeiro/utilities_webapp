class LengthConverter {
  constructor() {
    this.lengthUnits = {
      kilometer: document.getElementById('kilometer'),
      meter: document.getElementById('meter'),
      centimeter: document.getElementById('centimeter'),
      millimeter: document.getElementById('millimeter'),
      micrometer: document.getElementById('micrometer'),
      nanometer: document.getElementById('nanometer'),
      mile: document.getElementById('mile'),
      yard: document.getElementById('yard'),
      inch: document.getElementById('inch'),
      foot: document.getElementById('foot'),
      nauticalMile: document.getElementById('nauticalMile'),
    };

    Object.keys(this.lengthUnits).forEach((key) => {
      if (Number.isNaN(this.lengthUnits[key].value)) {
        this.lengthUnits[key].value = '';
      }
    });

    this.conversionFactor = {
      kilometer: [
        1,
        1e3,
        1e5,
        1e6,
        1e9,
        1e12,
        1 / 1.609,
        1094,
        39370,
        3281,
        0.5399568,
      ],
      meter: [
        1e-3,
        1,
        1e2,
        1e3,
        1e6,
        1e9,
        1 / 1609.34,
        1.094,
        39.37,
        3.281,
        1 / 1852,
      ],
      centimeter: [
        1e-5,
        1e-2,
        1,
        1e1,
        1e4,
        1e7,
        1 / 160934,
        1 / 91.44,
        1 / 2.54,
        1 / 30.48,
        1 / 185200,
      ],
      millimeter: [
        1e-6,
        1e-3,
        1e-2,
        1,
        1e3,
        1e6,
        1 / 1.609e6,
        1 / 914.4,
        1 / 25.4,
        1 / 304.8,
        1 / 1.852e6,
      ],
      micrometer: [
        1e-9,
        1e-6,
        1e-4,
        1e-3,
        1,
        1e3,
        1 / 1.609e9,
        1 / 9.144e5,
        1 / 25400,
        1 / 304800,
        1 / 1.852e9,
      ],
      nanometer: [
        1e-12,
        1e-9,
        1e-7,
        1e-6,
        1e-3,
        1,
        1 / 1.609e12,
        1 / 9.144e8,
        1 / 2.54e7,
        1 / 3.048e8,
        1 / 1.852e12,
      ],
      mile: [
        1.609, 1609.34, 160934, 1.609e6, 1.609e9, 1.609e12, 1, 1760, 63360,
        5280, 0.868976,
      ],
      yard: [
        1 / 1094,
        0.9144,
        91.44,
        914.4,
        9.144e5,
        9.144e8,
        1 / 1760,
        1,
        36,
        3,
        1 / 2025,
      ],
      inch: [
        1 / 39370,
        1 / 39.37,
        2.54,
        25.4,
        25400,
        2.54e7,
        1 / 63360,
        1 / 36,
        1,
        1 / 12,
        1 / 72913.386,
      ],
      foot: [
        1 / 3281,
        0.3048,
        30.48,
        304.8,
        304800,
        3.048e8,
        1 / 5280,
        1 / 3,
        12,
        1,
        1 / 6076.115,
      ],
      nauticalMile: [
        1 / 0.5399568,
        1852,
        185200,
        1.852e6,
        1.852e9,
        1.852e12,
        1.151,
        2025,
        72913.386,
        6076.115,
        1,
      ],
    };
    this.addEventListeners();
  }

  convertFromTo(from, to, value) {
    return value * this.conversionFactor[from][this.getUnitIndex(to)];
  }

  getUnitIndex(unit) {
    return Object.keys(this.lengthUnits).indexOf(unit);
  }

  handleConverter(e) {
    const from = e.target.id;
    const value = parseFloat(e.target.value);

    if (Number.isNaN(value)) {
      Object.keys(this.lengthUnits).forEach((key) => {
        this.lengthUnits[key].value = '';
      });
      return;
    }

    Object.keys(this.lengthUnits).forEach((key) => {
      if (key !== from) {
        const to = key;
        try {
          const convertedValue = this.convertFromTo(from, to, value);
          if (Number.isNaN(convertedValue))
            throw new Error('Invalid value entered');
          this.lengthUnits[to].value = convertedValue;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    });
  }

  addEventListeners() {
    Object.keys(this.lengthUnits).forEach((key) => {
      this.lengthUnits[key].addEventListener(
        'input',
        this.handleConverter.bind(this),
      );
    });
  }

  removeEventListeners() {
    Object.keys(this.lengthUnits).forEach((key) => {
      this.lengthUnits[key].removeEventListener(
        'input',
        this.handleConverter.bind(this),
      );
    });
  }
}

export default LengthConverter;
