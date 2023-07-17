class SpeedConverter {
  constructor() {
    this.speedUnits = {
      milePerHour: document.getElementById('milePerHour'),
      footPerSecond: document.getElementById('footPerSecond'),
      meterPerSecond: document.getElementById('meterPerSecond'),
      kilometerPerHour: document.getElementById('kilometerPerHour'),
      knots: document.getElementById('knots'),
    };

    this.handleConverter = this.handleConverter.bind(this);

    Object.keys(this.speedUnits).forEach((key) => {
      if (Number.isNaN(this.speedUnits[key].value)) {
        this.speedUnits[key].value = '';
      }
    });

    this.conversionFactor = {
      milePerHour: [1, 1.467, 2.237, 1.609, 1.151],
      footPerSecond: [1 / 1.467, 1, 3.281, 1.097, 1.688],
      meterPerSecond: [1 / 2.237, 1 / 3.281, 1, 3.6, 1.944],
      kilometerPerHour: [1 / 1.609, 1 / 1.097, 1 / 3.6, 1, 1 / 1.852],
      knots: [1 / 1.151, 1 / 1.688, 1 / 1.944, 1.852, 1],
    };

    this.addEventListeners();
  }

  convertFromTo(from, to, value) {
    return value * this.conversionFactor[from][this.getUnitIndex(to)];
  }

  getUnitIndex(unit) {
    return Object.keys(this.speedUnits).indexOf(unit);
  }

  handleConverter(e) {
    const from = e.target.id;
    const value = parseFloat(e.target.value);

    if (Number.isNaN(value)) {
      Object.keys(this.speedUnits).forEach((key) => {
        this.speedUnits[key].value = '';
      });
      return;
    }

    Object.keys(this.speedUnits).forEach((key) => {
      if (key !== from) {
        const to = key;
        try {
          const convertedValue = this.convertFromTo(from, to, value);
          if (Number.isNaN(convertedValue))
            throw new Error('Invalid value entered');
          this.speedUnits[to].value = convertedValue;
        } catch (error) {
          throw new Error(`Invalid input: ${error}`);
        }
      }
    });
  }

  addEventListeners() {
    Object.keys(this.speedUnits).forEach((key) => {
      this.speedUnits[key].addEventListener('input', this.handleConverter);
    });
  }

  removeEventListeners() {
    Object.keys(this.speedUnits).forEach((key) => {
      this.speedUnits[key].removeEventListener('input', this.handleConverter);
    });
  }
}

export default SpeedConverter;
