import Converter from './Converter';

/**
 * SpeedConverter class for converting between various speed units.
 * @extends Converter
 */
class SpeedConverter extends Converter {
  /**
   * Constructs a new SpeedConverter.
   */
  constructor() {
    const speedUnits = {
      milePerHour: document.getElementById('milePerHour'),
      footPerSecond: document.getElementById('footPerSecond'),
      meterPerSecond: document.getElementById('meterPerSecond'),
      kilometerPerHour: document.getElementById('kilometerPerHour'),
      knots: document.getElementById('knots'),
    };
    super(speedUnits);

    this.conversionFactor = {
      milePerHour: [1, 1.467, 2.237, 1.609, 1.151],
      footPerSecond: [1 / 1.467, 1, 3.281, 1.097, 1.688],
      meterPerSecond: [1 / 2.237, 1 / 3.281, 1, 3.6, 1.944],
      kilometerPerHour: [1 / 1.609, 1 / 1.097, 1 / 3.6, 1, 1 / 1.852],
      knots: [1 / 1.151, 1 / 1.688, 1 / 1.944, 1.852, 1],
    };
  }
}

export default SpeedConverter;
