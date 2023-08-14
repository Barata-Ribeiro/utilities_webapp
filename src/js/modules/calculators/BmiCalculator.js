/**
 * Class to handle and display Body Mass Index (BMI) calculations.
 */
class BmiCalculator {
  /**
   * Initializes the class, setting up default properties and initial methods to run.
   */
  constructor() {
    /**
     * @type {Object} Container for weight and height input elements.
     * @property {HTMLInputElement} bmiWeight - Input element for weight.
     * @property {HTMLInputElement} bmiHeight - Input element for height.
     */
    this.bmiUnits = {
      bmiWeight: document.getElementById('bmiWeight'),
      bmiHeight: document.getElementById('bmiHeight'),
    };

    /**
     * @type {HTMLElement} Element to display the result of the BMI calculation.
     */
    this.result = document.getElementById('bmiResult');

    this.handleCalculation = this.handleCalculation.bind(this);

    this.addEventListeners();
  }

  /**
   * Calculates and displays the BMI result based on the inputted weight and height.
   */
  handleCalculation() {
    const weight = parseFloat(this.bmiUnits.bmiWeight.value);
    const height = parseFloat(this.bmiUnits.bmiHeight.value);

    // This prevent the result to show while the user
    // haven't filled both areas.
    if (Number.isNaN(weight) || Number.isNaN(height)) {
      this.result.textContent = '';
      return;
    }

    const bmi = weight / ((height / 100) * (height / 100));

    if (bmi < 16) {
      this.result.textContent = `Your BMI is ${bmi.toFixed(
        2,
      )}, indicating you are severely underweight.`;
    } else if (bmi >= 16 && bmi < 18.5) {
      this.result.textContent = `Your BMI is ${bmi.toFixed(
        2,
      )}, indicating you are underweight.`;
    } else if (bmi >= 18.5 && bmi < 25) {
      this.result.textContent = `Your BMI is ${bmi.toFixed(
        2,
      )}, indicating you are in the healthy weight range.`;
    } else if (bmi >= 25 && bmi < 30) {
      this.result.textContent = `Your BMI is ${bmi.toFixed(
        2,
      )}, indicating you are overweight.`;
    } else if (bmi >= 30 && bmi < 35) {
      this.result.textContent = `Your BMI is ${bmi.toFixed(
        2,
      )}, indicating you are obese.`;
    } else if (bmi >= 35 && bmi < 40) {
      this.result.textContent = `Your BMI is ${bmi.toFixed(
        2,
      )}, indicating you have severe obesity.`;
    } else if (bmi >= 40) {
      this.result.textContent = `Your BMI is ${bmi.toFixed(
        2,
      )}, indicating you have morbid obesity.`;
    }
  }

  /**
   * Add event listeners to the weight and height input elements.
   */
  addEventListeners() {
    Object.keys(this.bmiUnits).forEach((key) => {
      this.bmiUnits[key].addEventListener('input', this.handleCalculation);
    });
  }

  /**
   * Remove event listeners from the weight and height input elements.
   */
  removeEventListeners() {
    Object.keys(this.bmiUnits).forEach((key) => {
      this.bmiUnits[key].removeEventListener('input', this.handleCalculation);
    });
  }
}

export default BmiCalculator;
